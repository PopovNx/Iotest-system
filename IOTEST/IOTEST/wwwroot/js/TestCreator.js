const app = new Vue({
    el: "#app",
    data: {
        Core:null,
    },
    methods: {
        Init: function () {           
            const Data = new FormData();
            Data.append('method', 'GetTest');
            axios.post('/method', Data).then(test => this.TestLoad(test));
        },
        TestLoad(test){
            const canvas = document.getElementById("TestCanvas");
            const parent = document.getElementById("TestMain");            
            this.Core = new TestCore(canvas, parent,test.data);
            console.log(this.Core)
        },
        AddElement(){
            this.Core.Request(); 
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
