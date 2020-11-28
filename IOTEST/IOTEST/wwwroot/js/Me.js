var app = new Vue({
    el: "#app",
    data: {
        NewGroupName:"",
        ConnectGroupKey:"",
    },
    methods: {
        ConnectToGroup() {
            var Data = new FormData();
            Data.append('method', 'ConnectToGroup');
            Data.append('Key', this.ConnectGroupKey);
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
                console.log(x.data);
            });
        }
    },
    mounted() {
    }
})