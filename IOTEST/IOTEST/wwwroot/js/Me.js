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
        }
    },
    mounted() {
    }
})