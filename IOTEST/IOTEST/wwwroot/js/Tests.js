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
        EditedTest: null,
        EditedTestResults: [],
    },
    methods: {
        CreateTest: async function (update) {
            if (this.TestName.length < 5) {
                this.TestNameInvalid =Lang.testsWrong;
                return;
            } else {
                this.TestNameInvalid = null;
            }
            const test = new Test(this.TestName, this.TestDescription, this.TestEndDescription);
            if (update) {
                test.Key = this.EditedTest.Key;
                test.Disabled = this.EditedTest.Disabled;
            }
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
            this.TestName = this.EditedTest.Name;
            this.TestDescription = this.EditedTest.Description;
            this.TestEndDescription = this.EditedTest.FinalText;
            window.ET = i;
        },
        CreateTestOpen() {
            this.ShowMode = 1;
            this.TestName = "";
            this.TestDescription = "";
            this.TestEndDescription = "";
        },
        async Results(i) {
            this.ShowMode = 15;
            this.EditedTest = i;

            this.EditedTestResults = [];
            const Data = new FormData();
            Data.append('method', 'GetTestResult');
            Data.append('Key', i.Key);
            const data = await axios.post('/method', Data);
            this.EditedTestResults = data.data;
            console.log(data.data)

        },
        async DropTest(i) {
            const Data = new FormData();
            Data.append('method', 'RemoveTest');
            Data.append('Key', i.Key);

            await axios.post('/method', Data);
            await this.LoadTests();
        },
        AddTask: async function () {

            const editTest = this.EditedTest.Key;
            const Data = new FormData();
            Data.append('method', 'CreateTask');
            console.log(editTest)
            Data.append('TestKey', editTest);
            Data.append('Name', "Новое задание");            
           console.log( await axios.post('/method', Data));
            await this.LoadTests();
            this.EditTest(this.LoadedTests.find(x=>x.Key === editTest));
            
        },
        EditTask(e){
            location.href = `/testCreator/${this.EditedTest.Key}/${e.Id}`;
        },
        async RemoveTask(task) {
            if(!confirm(Lang.MeGroupJSConfirmDeleteExercise)){
               return;
            }
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
        },
        GetFTime(e){

            const last = e[e.length-1];
            const dt = new Date(last);
            return `${last.split(".")[0]}`;
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
