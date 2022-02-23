const app = new Vue({
    el: "#app",
    data: {
        Core: null,
        nObj: null,
        AddMode: 0,
        AddResourceMode: 0,
        ResourcesAw: [],
        ResourcesAwSelected: [],
        EditObj: null,
        LastSave: null,
        MenuMode: 0,
        EditedTrigger: null,

        EditTextData: null,

        EditAnimData: null,


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
            this.Core = new TestCore(canvas, parent, test, false);
            window.Core = this.Core;
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
        EditObject(e) {
            this.EditObj = e;
            this.EditTextData = e.GetText();
            this.MenuMode = 30;
        },
        AddObjectMenu(isNew) {
            if (isNew) {
                this.nObj = new NewObject();
            }
            this.MenuMode = 20;
        },
        async SaveTest() {
            this.LastSave = this.Core.Save();
            const Data = new FormData();
            Data.append('method', 'SaveTest');
            Data.append('Key', TestKey);
            Data.append('Data', JSON.stringify(this.LastSave));
            await axios.post('/method', Data);
            console.log(this.LastSave)
        },
        NeedSave() {
            if (this.Core === null) return false;
            const save = this.Core.Save();

            return JSON.stringify(save) === JSON.stringify(this.LastSave);
        },
        AddTrigger() {
            this.Core.Request("trgAdd");

        },
        EditTrigger(r) {
            this.EditedTrigger = r;
            this.MenuMode = 41;
            console.log(r)
        },
        DestroyTrigger(r) {
            this.Core.Request("destroyTrg", r);
        },
        MoveZObject(r, d) {
            if (d === 0) {
                this.Core.Request("downElement", r);
            } else {
                this.Core.Request("upElement", r);
            }

        },
        AddText() {
            const nOb = new NewObject(-1, {text: "Новый текст", color: "#0f3fff"});
            console.log(nOb)
            this.Core.Request("add", nOb);
        },
        AddAnimation() {
            this.Core.Request("createAnim")
        },
        DestroyAnimation(r) {
            this.Core.Request("destroyAnim", r)
        },
        EditAnimation(r) {
            this.EditAnimData = r;
            this.MenuMode = 61;

            console.log(r)
        },
        AddActivator() {
            this.Core.Request("addActivator", this.EditAnimData);
        },
        AddEventAction() {
            this.Core.Request("addEventAction", this.EditAnimData);
        },
        CheckEventSelectors(ax) {
            ax.Selector = ax.Selector.filter(function (x) {
                return x !== "";
            });
        }

    },
    watch: {},
    computed: {
        HeaderBoxOne: function () {
            switch (this.MenuMode) {
                case 0:
                    return Lang.TestMenu;
                case 1:
                    return Lang.TestResource;
                case 2:
                    return Lang.TestAdd;
                case 20:
                    return Lang.TestObject;
                case 30:
                    return Lang.TestObject;
                case 40:
                    return Lang.TestTriggers;
                case 41:
                    return Lang.TestTrigger;
                case 50:
                    return Lang.TestPosition;
                case 60:
                    return Lang.TestAnimations;
                case 61:
                    return Lang.TestAnimation;
                case 100:
                    return Lang.TestTask;
                default:
                    return "error";
            }
        }
    },
    mounted() {
        this.Init();
        setInterval(x => (this.$forceUpdate()), 200);
    }
});
