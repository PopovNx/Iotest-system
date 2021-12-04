const app = new Vue({
    el: "#app",
    data: {
        Core: null,
        nObj: null,
        AddMode: 0,
        AddResourceMode: 0,
        ResourcesAw: [],
        ResourcesAwSelected: [],

        MenuMode: 0,

    },
    methods: {
        Init: function () {
            const Data = new FormData();
            Data.append('method', 'GetTest');
            Data.append('TestKey', TestKey);
            Data.append('TestId', TestId);
            axios.post('/method', Data).then(x => this.TestLoad(x.data));
        },
        TestLoad: function (test) {
            const canvas = document.getElementById("TestCanvas");
            const parent = document.getElementById("TestMain");
            console.log(test)
            this.Core = new TestCore(canvas, parent, test);
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
                    if (this.Core.Resources.some(x => x.Url === rElement.Url)) continue;
                    this.ResourcesAw.push(rElement);
                }
            });
        },
        AddResourcesSelect: function (t) {
            if (this.ResourcesAwSelected.includes(t))
                this.ResourcesAwSelected = this.ResourcesAwSelected.filter(x => x !== t);
            else this.ResourcesAwSelected.push(t);
        },
        AddResources() {
            this.Core.Request("resAdd", this.ResourcesAwSelected);
            this.AddResourceMode = 0;
            this.ResourcesAwSelected = [];
            this.ResourcesAw = [];
        },
        DestroyObject(e) {
            this.Core.Request("removeObj", e);
        },
        AddObjectMenu(isNew){
            if(isNew){
                this.nObj = new NewObject();
            }
            this.MenuMode = 20;
        },
        async SaveTest() {
            const Data = new FormData();
            Data.append('method', 'SaveTest');
            Data.append('Key', TestKey);
           
            const s = this.Core.Save();
            console.log(s)
            Data.append('Data', JSON.stringify(s));
            const dx = await axios.post('/method', Data);
            console.log(dx.data)
           

        }

    },
    watch: {},
    computed: {},
    mounted() {
        this.Init();
        setInterval(x => (this.$forceUpdate()), 70);
    }
});
