const app = new Vue({
    el: "#app",
    data: {
        Core:null,
    },
    methods: {
        Init: function () {
            const canvas = document.getElementById("TestCanvas");
            const parent = document.getElementById("TestMain");
            const Data = new FormData();
            Data.append('method', 'GetTest');
            axios.post('/method', Data).then((test) => {
                this.Core = new TestCore(canvas, parent,test.data);
                console.log(this.Core)
            });        

        }
    },
    watch: {
    
    },
    computed: {
       
    },
    mounted() {
        this.Init();
    }
});
