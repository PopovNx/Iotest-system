const app = new Vue({
    el: "#app",
    data: {
        ShowMode: 0,
        MouseOverGroup: 0,
        LoadedTests: [],
        TestName: "",
        TestNameInvalid: null,
        TestDescription: "",
        TestEndDescription: "",
        EditedTest: null
    },
    methods: {
        CreateTest: async function () {
            if (this.TestName.length < 5) {
                this.TestNameInvalid = "Неправильное название";
                return;
            } else {
                this.TestNameInvalid = null;
            }
            const test = new Test(this.TestName, this.TestDescription, this.TestEndDescription);
            const Data = new FormData();
            Data.append('method', 'CreateTest');
            Data.append('Data', JSON.stringify(test));
            const dTest = await axios.post('/method', Data);
            this.EditTest(dTest.data);
            await this.LoadTests();
        },
        LoadTests: async function () {
            const Data = new FormData();
            Data.append('method', 'GetAllTest');
            await axios.post('/method', Data).then(x => this.LoadedTests = x.data);
        },
        EditTest(i) {
            this.ShowMode = 11;
            this.EditedTest = i;
        },
        AddTask: function (i, e) {
            let id = Math.random().toString().split(".")[1].slice(0, 8);
            if (e === true) {
                id = i.Id;
            }
            location.href = `https://iotest.pp.ua/testCreator?test=${this.EditedTest.Key}&id=${id}`;
        },
        async RemoveTask(task) {
            console.log(task);
            const enTestKey = this.EditedTest.Key;
            const Data = new FormData();
            Data.append('method', 'RemoveTestX');
            Data.append('TaskId', task.Id);
            Data.append('TestKey', enTestKey);
            axios.post('/method', Data).then(x => {
                this.LoadTests().then(y => {
                    this.EditTest(this.LoadedTests.find(x => x.Key === enTestKey));
                })

            });

        }

    },
    watch: {},
    computed: {
        EditedLevelsList() {
            return JSON.parse(this.EditedTest.JsonData).Levels;
        }

    },
    async mounted() {
        await this.LoadTests();
    }
});
