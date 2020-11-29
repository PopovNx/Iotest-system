var app = new Vue({
    el: "#app",
    data: {
        NewGroupName: "",
        ConnectGroupKey: "",
        GroupSelectedData: {},
        TestData: {},
        TestAddKey: "",
        SelectedGroup: "",
        TestResultt: {}
    },
    methods: {
        ConnectToGroup() {
            var Data = new FormData();
            Data.append('method', 'ConnectToGroup');
            Data.append('Key', this.ConnectGroupKey);
            axios.post('/method', Data).then(() => location = location);
        },
        ConnectTest() {
            var Data = new FormData();
            Data.append('method', 'ConnectTest');
            Data.append('TKey', this.TestAddKey);
            Data.append('GKey', this.SelectedGroup);
            axios.post('/method', Data).then(() => location = location);
        },
        CreateGroup() {
            var Data = new FormData();
            Data.append('method', 'CreateGroup');
            Data.append('Name', this.NewGroupName);
            axios.post('/method', Data).then(() => location = location);
        },
        AboutGroup(e) {
            var Data = new FormData();
            Data.append('method', 'AboutGroup');
            Data.append('Key', e);
            axios.post('/method', Data).then((x) => {
                this.GroupSelectedData = x.data;
                var Modal = new bootstrap.Modal(document.getElementById('AboutGroup'), {});
                Modal.show();
                this.SelectedGroup = e;
            });
        },
        CreateTest(e) {
            var Data = new FormData();
            Data.append('method', 'CreateTest');
            var Data1 = JSON.parse(JSON.stringify(this.TestData));
            delete Data1.Mapss;
            var Data2 = JSON.stringify(Data1);
            Data.append('Data', encodeURIComponent(Data2));
            axios.post('/method', Data).then((x) => {
                console.log(x.data);
            });
        },
        GetTestData(e) {
            var Data = new FormData();
            Data.append('method', 'GetTestResult');
            Data.append('Key', e);
            axios.post('/method', Data).then((x) => {
                var Modal = new bootstrap.Modal(document.getElementById('TestResults'), {});
                Modal.show();
                this.TestResultt = x.data;
            });
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
                this.TestData.Maps = JSON.parse(e.replaceAll("'", '"'));
        },
    },
    mounted() {
    }
})
console.log(app);