const app = new Vue({
    el: "#app",
    data: {
        AllGroups: [],
        MouseOverGroup:null,
        AllCourses: true,
        LoadedGroups: false,
        ShowMode: 1,
        //0 Basic Menu
        //1 Create Group
        //2 Group Edit
        NewGroupName: "",
        NewGroupOpen: true,
        NewGroupNameInvalid: null,
        
        GroupEditId:null
    },
    methods: {
        GetGroups: function () {
            const data = new FormData( );
            data.append('method', 'GetAllGroups');
            axios.post('/method', data).then((e) => {
                this.AllGroups = e.data;
                if(this.GroupEditId ==null&&e.data.length>0)
                    this.GroupEditId = e.data[0].Key;
                this.LoadedGroups = true;
            });
        },
        CreateGroup: function () {
            const data = new FormData();
            data.append('method', 'CreateGroup');
            data.append('Name', this.NewGroupName);
            data.append('IsOpen', this.NewGroupOpen.toString());
            if (this.NewGroupName.length < 4 || this.NewGroupName.length > 16) {
                this.NewGroupNameInvalid = "Неверное название";
                return
            }
            this.NewGroupNameInvalid = null;
            axios.post('/method', data).then((e) => {
                if (e.data === "exist") {
                    this.NewGroupNameInvalid = "Курс с таким именем уже существует";
                } else {
                    if (e.data.split("-").length === 4) {
                        this.ShowMode = 2;
                        this.GroupEditId = e.data;
                        this.GetGroups();
                    }
                }
            });
        }
    },
    watch:{

    },
    computed:{
        ShowedGroups: function () {

            return this.AllGroups.filter(x=>!(x.Admin===MyMail^this.AllCourses));
        },
        EditGroupLabel: function () {
            const group = this.AllGroups.find(x=>x.Key===this.GroupEditId);

            if(group==null) return;
            return group.Name;
        }
    },
    mounted() {
        this.GetGroups();
    }
});
