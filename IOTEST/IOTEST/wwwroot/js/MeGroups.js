const app = new Vue({
    el: "#app",
    data: {
        AllGroups: [],
    },
    methods: {
        GetGroups() {
            const Data = new FormData();
            Data.append('method', 'GetAllGroups');
            axios.post('/method', Data).then((e) => this.AllGroups = e.data);
        }
    },
    mounted() {
        this.GetGroups();
    }
});
