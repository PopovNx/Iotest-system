const app = new Vue({
    el: "#app",
    data: {
        Core:null,
        nObj: new NewObject(), 
        AddMode:0,
        AddResourceMode:0,
        ResourcesAw:[],
        ResourcesAwSelected:[]
        
    },
    methods: {
        Init: function () {           
            const Data = new FormData();
            Data.append('method', 'GetTest');
            console.log(new Date().getMilliseconds()+new Date().getSeconds()*1000)
            axios.post('/method', Data).then(test => this.TestLoad(test));
        },
        TestLoad: function (test) {
            console.log(test)
            console.log(new Date().getMilliseconds() + new Date().getSeconds() * 1000)
            const canvas = document.getElementById("TestCanvas");
            const parent = document.getElementById("TestMain");
            this.Core = new TestCore(canvas, parent, test.data);
            console.log(this.Core)
        },
        AddElement: function () {
            this.Core.Request("add", this.nObj);
        },
        AddResource: function () {
            this.AddResourceMode = 1;
            const Data = new FormData();
            Data.append('method', 'GetAllResources');
            axios.post('/method', Data).then(r => {
                this.ResourcesAw = [];
                for (const rElement of r.data) {
                    rElement.__proto__ = Resource.prototype;
                    if(this.Core.Resources.some(x=>x.Url===rElement.Url)) continue;
                    this.ResourcesAw.push(rElement);
                }
                console.log(r)
            });
        },
        AddResourcesSelect: function (t) {
            if (this.ResourcesAwSelected.includes(t))
                this.ResourcesAwSelected = this.ResourcesAwSelected.filter(x => x !== t);
            else this.ResourcesAwSelected.push(t);
        },
        AddResources(){
            this.Core.Request("resAdd", this.ResourcesAwSelected);
            this.AddResourceMode = 0;
            this.ResourcesAwSelected = [];
            this.ResourcesAw = [];
            
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
