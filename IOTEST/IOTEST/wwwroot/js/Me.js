var app = new Vue({
    el: "#app",
    data: {
        NewGroupName:"",
    },
    methods: {
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