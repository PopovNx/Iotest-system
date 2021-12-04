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
        EditedTest:null
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
        EditTest(i){
            this.ShowMode = 11;
            this.EditedTest = i;            
        },
        AddTask(){
            location.href=`https://iotest.pp.ua/testCreator?test=${this.EditedTest.Key}&id=${Math.random().toString().split(".")[1].slice(0,8)}`;
        }

    },
    watch: {},
    computed: {},
    async mounted() {
        await this.LoadTests();
    }
});
