const app = new Vue({
    el: "#app",
    data: {
        Core: null,
        nObj: null,
        AddMode: 0,
        AddResourceMode: 0,
        ResourcesAw: [],
        EditObj: null,
        LastSave: null,
        MenuMode: 0,
        EditedTrigger: null,

        EditTextData: null,

        EditAnimData: null,
        ResDisMode: 0,
        imgFile: null,
        imgBase64: null,
        imgFileLabel: "",
        imgFileLoading: 0,
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
            const canvas = document.getElementById("canvaHolder");
            const parent = document.getElementById("TestMain");
            console.log(test)
            this.Core = new TestCore(canvas, parent, test, false, true, (e)=>{
                this.LastSave = e.Save();
            });
            window.Core = this.Core;
            this.Core.OpenEditFunction = this.EditObject;
           
            document.addEventListener('keyup',  (evt)=> {
                if (evt.key  === "Escape") {
                    this.UnselectObject();
                }
            });
        },
        AddElement: function () {

            this.Core.Request("add", this.nObj);
        },
        async GetAllResources() {
            const Data = new FormData();
            Data.append('method', 'GetAllResources');
            await axios.post('/method', Data).then(r => {
                this.ResourcesAw = [];
                for (const rElement of r.data) {
                    rElement.Item2.__proto__ = Resource.prototype;
                    rElement.Item2.public = rElement.Item1
                    this.ResourcesAw.push(rElement.Item2);
                }
            });
        },
        AddResource: async function (mode) {
            await this.GetAllResources();
            this.ResDisMode = mode;
            this.AddResourceMode = 1;
            
        },
        AddResourceToList(r) {
            this.Core.Request("resAdd", r);
        },
        AddResourceToListBack() {
            this.AddResourceMode = 0;
            this.ResourcesAw = [];
        },
        DestroyObject(e) {
            this.Core.Request("removeObj", e);
            if (this.EditObj === e) {
                this.MenuMode = 0;
                this.EditObj = null;
            }
        },
        EditObject(e) {
            this.UnselectObject(this.EditObj);
            this.EditObj = e;
            for (const objElement of Core.Request('getObjects')) {
                objElement.Selected = false;
            }
            this.EditObj.Selected = true;
            this.EditTextData = e.GetText();
            this.MenuMode = 30;
        },
        UnselectObject() {
            this.MenuMode = 0;
            if (this.EditObj)
                this.EditObj.Selected = false;
            this.EditObj = null

        },
        ObjectMouseover(obj){
            if(!this.EditObj){
                for (const objElement of Core.Request('getObjects')) {
                    objElement.Selected = false;
                }
                obj.Selected = true;
            }
        },
        AddObjectMenu() {
            this.nObj = new NewObject();
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
        }      ,
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
            this.Core.Request("add", new NewObject(-1, {text: "Text", color: "#0f3fff"}));
        },
        AddAnimation() {
            this.Core.Request("createAnim")
        },
        DestroyAnimation(r) {
            this.Core.Request("destroyAnim", r)
        },
        EditAnimation(r,t) {
            this.EditAnimData = r;
            this.MenuMode = 61+t;
        },
        AddActivator() {
            this.Core.Request("addActivator", this.EditAnimData);
        },
        AddEventAction() {
            this.Core.Request("addEventAction", this.EditAnimData);
        },
        CheckEventSelectors(ax) {
            ax.Selector = ax.Selector.filter(function (x) {
                return !isNaN(x);
            });
            ax.Selector =  [...new Set(ax.Selector)]
        },
        isResUsed(r) {
            return Core.Request('getObjects').some(x => x.Resource === r);
        },
        RemoveResource(r) {
            if (this.isResUsed(r)) return;
            this.Core.Request("removeRes", r);
            console.log(r)
        },
        async ExcludeResource(r) {
            const Data = new FormData();
            Data.append('method', 'ExcludeResource');
            Data.append('Resource', JSON.stringify(r));
            console.log(await axios.post('/method', Data));
            console.log(r)
            await this.GetAllResources();
        },
        LoadImg() {
            const files = this.$refs.picInp.files;
            if (files.length !== 1) return;
            this.imgFile = files[0];
            if (this.imgFile.size > 2000000) {
                this.imgFile = null;
                alert("Размер файла не может привышать 2 мегабайта");
                return;
            }
            console.log(this.imgFile);
        },
        async CompleteUpload(e) {
            if (e === 1) {
                if (!this.NewResNameCorrect) return;
                const Data = new FormData();
                Data.append('method', 'AddResource');
                Data.append('Name', this.imgFileLabel);
                Data.append('Image', this.imgFile);
                this.imgFileLoading = 1;
                await axios.post('/method', Data, {headers: {'Content-Type': 'multipart/form-data'}});
                this.imgFileLoading = 0;
            }
            this.imgFile = null;
            this.imgFileLabel = "";
           await this.AddResource(1);
        },
        NeedSave() {
            if (this.Core === null) return false;
            const save = this.Core.Save();
            return JSON.stringify(save) === JSON.stringify(this.LastSave);
        }

    },
    watch: {
        imgFile: function (e) {
            if (e === null) {
                this.imgBase64 = null;
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => this.imgBase64 = e.target.result
            reader.readAsDataURL(e);
        },
        MenuMode(e) {
            console.log(e);
        }

    },
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
                case 62:
                    return Lang.TestAnimation;
                case 100:
                    return Lang.TestTask;
                default:
                    return "error";
            }
        },
        MaxHeightUCanva: function () {
            return this.Core.LastWidth / 3 * 2 + 'px';
        },
        ResSelectorList: function () {
            return this.ResourcesAw.filter(x => x.public ^ this.ResDisMode);
        },
        NewResNameCorrect: function () {
            return this.imgFileLabel.length > 3 && this.imgFileLabel.length < 12 && this.imgBase64;
        }
    },
    mounted() {
        this.Init();
        setInterval(x => (this.$forceUpdate()), 200);
        window.onbeforeunload=(e)=> {
         if(!this.NeedSave()){
             e.cancelBubble = true;
             e.returnValue = '';
             if (e.stopPropagation) {
                 e.stopPropagation();
                 e.preventDefault();
             }
         }
        };
    }
});
window.app = app;