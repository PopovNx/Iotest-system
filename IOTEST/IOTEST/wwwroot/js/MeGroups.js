const app = new Vue({
    el: "#app",
    data: {
        AllGroups: [],
        MouseOverGroup: null,
        AllCourses: false,
        LoadedGroups: false,
        ShowMode: 0,
        //0 Basic Menu
        //1 Create Group
        //2 Group Edit
        NewGroupName: "",
        NewGroupOpen: true,
        NewGroupNameInvalid: null,

        GroupEditId: null,
        EditGroupOpen: true,

        ConnectGroupKey: null,
        ConnectGroupKeyInvalid: null,
        ConnectTestKey:"",
        ConnectTestKeyInvalid:null,
        EditedTestResults:[],
    },
    methods: {
        GetGroups: function () {
            const data = new FormData();
            data.append('method', 'GetAllGroups');
            axios.post('/method', data).then((e) => {
                this.AllGroups = e.data;
                if (this.GroupEditId == null && e.data.length > 0)
                    this.GroupEditId = e.data[0].Key;
                this.LoadedGroups = true;
                
            });
        },
        CreateGroup: function () {
            const data = new FormData();
            data.append('method', 'CreateGroup');
            data.append('Name', this.NewGroupName);
            data.append('IsOpen', this.NewGroupOpen.toString());
            if (this.NewGroupName.length < 4 || this.NewGroupName.length > 32) {
                this.NewGroupNameInvalid = Lang.meGroupsConnectToCoursesErrorInvalidName;
                return
            }
            this.NewGroupNameInvalid = null;
            axios.post('/method', data).then((e) => {
                if (e.data === "exist") {
                    this.NewGroupNameInvalid = Lang.meGroupsConnectToCoursesAlreadyExists;
                } else {
                    if (e.data.split("-").length === 4) {
                        this.ShowMode = 2;
                        this.GroupEditId = e.data;
                        this.GetGroups();
                    } else {
                        this.NewGroupNameInvalid =Lang.meGroupsConnectToCoursesUnknownError;
                    }
                }
            });
        },
        OpenGroupEdit: function (e) {
            this.GroupEditId = e;
            this.ShowMode = 2;
            console.log(this.EditGroup);
        },
        async RemoveTestFromGroup(e) {
            if(!confirm(Lang.MeGroupJSConfirmDelete)){
                return false
            }
            const key = JSON.parse(e).Key;
            const Data = new FormData();
            Data.append('method', 'ConnectTest');
            Data.append('GroupKey', this.EditGroup.Key);
            Data.append('TestKey', key); 
            Data.append('Remove', "true");
            console.log(await axios.post('/method', Data));
            this.GetGroups();
 
        },
        async OpenResultList(i) {
            const test = JSON.parse(i);
            this.ShowMode = 4;
            const Data = new FormData();
            this.EditedTestResults=[];
            Data.append('method', 'GetTestResult');
            Data.append('Key', test.Key);
            Data.append('Group', this.GroupEditId);
            const data = await axios.post('/method', Data);
            this.EditedTestResults = data.data;
            this.EditedTestResults.Test = test.Name;
        },
        
        ConnectTest(){
            this.ConnectTestKeyInvalid = null;
            const Data = new FormData();
            Data.append('method', 'ConnectTest');
            Data.append('GroupKey', this.EditGroup.Key);
            Data.append('TestKey', this.ConnectTestKey);
            Data.append('Remove', "false");
            axios.post('/method', Data).then((e) => {
                console.log(e.data );
                if (e.data === "NoTest") {
                    this.ConnectTestKeyInvalid = Lang.meGroupsConnectTestTestNotFind;
                }  else if (e.data === "Contains") {
                    this.ConnectTestKeyInvalid = Lang.meGroupsConnectTestContained;
                }  else if (e.data === "OK") {
                    this.ConnectTestKeyInvalid = null;
                    this.GetGroups();
                } else {
                    this.ConnectTestKeyInvalid = Lang.meGroupsConnectToCoursesUnknownError;
                }
            });
        },
        RmSelectedCourse: function () {
            const data = new FormData();
            data.append('method', 'RemoveGroup');
            data.append('Key', this.EditGroup.Key);

            axios.post('/method', data).then((e) => {
                console.log(e);
                this.ShowMode = 0;
                this.GetGroups();
            });
        },
        GetFTime(e){

            const last = e[e.length-1];
            const dt = new Date(last);
            return `${last.split(".")[0]}`;
        },
        ConnectToGroup: function () {
            this.ConnectGroupKeyInvalid = null;
            const Data = new FormData();
            Data.append('method', 'ConnectToGroup');
            Data.append('Key', this.ConnectGroupKey);
            axios.post('/method', Data).then((e) => {
                if (e.data === "invalid" || e.data === "not found") {
                    this.ConnectGroupKeyInvalid = Lang.meGroupsConnectToCoursesNotFound;
                } else if (e.data === "adm") {
                    this.ConnectGroupKeyInvalid = Lang.meGroupsConnectToGroupYouAdmin;
                } else if (e.data === "contains") {
                    this.ConnectGroupKeyInvalid = Lang.meGroupsConnectToGroupYouMember;
                } else if (e.data === "close") {
                    this.ConnectGroupKeyInvalid = Lang.meGroupsClosedCourse;
                }  else if (e.data === "OK") {
                    this.ConnectGroupKeyInvalid = null;
                    this.ShowMode = 0;
                    this.GetGroups();
                } else {
                    this.ConnectGroupKeyInvalid = Lang.meGroupsConnectToCoursesUnknownError;
                }
            });

        },
    },
    watch: {
        GroupEditId: function () {
            if (this.EditGroup == null) return;
            this.EditGroupOpen = this.EditGroup.Open;
        },
        EditGroupOpen: function (e) {
            const data = new FormData();
            data.append('method', 'OpenGroupChange');
            data.append('Key', this.GroupEditId);
            data.append('State', e.toString());
            console.log(e)
            axios.post('/method', data).then((e) => {
                this.GetGroups();
                console.log(e.data)
            });
        },
        ShowMode(e){
            console.log(e);
        },
        EditedTestResults(e){
            console.log(e);
        }
    },
    computed: {
        ShowedGroups: function () {

            return this.AllGroups.filter(x => !(x.Admin === MyMail ^ this.AllCourses));
        },
        EditGroup: function () {
            return this.AllGroups.find(x => x.Key === this.GroupEditId);
        }
    },
    mounted() {
        this.GetGroups();
    }
});
