const app = new Vue({
    el: "#app",
    data: {
        NewGroupName: "",
        ConnectGroupKey: "",
        GroupSelectedData: {},
        TestData: {},
        TestAddKey: "",
        SelectedGroup: "",
        TestResult: {}
    },
    methods: {
        ConnectToGroup() {
            const Data = new FormData();
            Data.append('method', 'ConnectToGroup');
            Data.append('Key', this.ConnectGroupKey);
            axios.post('/method', Data).then(() => location.reload());
        },
        ConnectTest() {
            const Data = new FormData();
            Data.append('method', 'ConnectTest');
            Data.append('TKey', this.TestAddKey);
            Data.append('GKey', this.SelectedGroup);
            axios.post('/method', Data).then(() => location.reload());
        },
        CreateGroup() {
            const Data = new FormData();
            Data.append('method', 'CreateGroup');
            Data.append('Name', this.NewGroupName);
            axios.post('/method', Data).then(() => location.reload());
        },
        AboutGroup(e) {
            const Data = new FormData();
            Data.append('method', 'AboutGroup');
            Data.append('Key', e);
            axios.post('/method', Data).then((x) => {
                this.GroupSelectedData = x.data;
                const Modal = new bootstrap.Modal(document.getElementById('AboutGroup'), {});
                Modal.show();
                this.SelectedGroup = e;
            });
        },
        CreateTest(e) {
            const Data = new FormData();
            Data.append('method', 'CreateTest');
            const Data1 = JSON.parse(JSON.stringify(this.TestData));
            delete Data1.Mapss;
            const Data2 = JSON.stringify(Data1);
            Data.append('Data', encodeURIComponent(Data2));
            axios.post('/method', Data).then((x) => {
                console.log(x.data);
            });
        },
        ChangeUserStatus(e) {
            const Data = new FormData();
            Data.append('method', 'ChangeUserStatus');
            axios.post('/method', Data).then((x) => {
              location.reload();
            });
        },
        GetTestData(e) {
            const Data = new FormData();
            Data.append('method', 'GetTestResult');
            Data.append('Key', e);
            axios.post('/method', Data).then((x) => {
                const Modal = new bootstrap.Modal(document.getElementById('TestResults'), {});
                Modal.show();
                this.TestResult = x.data;
            });
        },
        async ChangeLang(e) {
            const lang = window.LangSelected;
            const Data = new FormData();
            Data.append('method', 'ChangeLanguage');
            Data.append('value', lang.toString());
            await axios.post('/method', Data);
            location.reload();
        }
    },
    watch: {
        "TestData.EndText": function (e) {
            if (e == null) return;
            if ((typeof e) == "string")
                this.TestData.EndText = this.TestData.EndText.split("\n");
        },
        "TestData.Mapss": function (e) {
            if ((typeof e) == "string")
                this.TestData.Maps = JSON.parse(e);
        },
    },
    mounted() {
    }
});
//console.log(app);