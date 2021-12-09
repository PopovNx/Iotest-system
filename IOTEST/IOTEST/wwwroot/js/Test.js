let app = new Vue({
    el: "#app",
    data: {
        PageNow: 0,
        Test: null,
        Levels: null,

        LevelNow: null,

        TestPage: false,
        Canva: null,
        CoreParent: null,
        Core: null,

        NowLevelIndex: 0
    },
    methods: {
        LoadLevel() {
            this.LevelNow = this.Levels[this.NowLevelIndex];
            this.Core = new TestCore(this.Canva, this.CoreParent, this.LevelNow, true);
            window.Core = this.Core;
        },
        async PassLevel() {
            const finish = (this.Levels.length - 1 === this.NowLevelIndex);
            const  DataX= {
                Correct: Core.CorrectState.trg,
                    Result: Core.GetState().trg
            }
            const Data = new FormData();
            Data.append('method', 'AcceptResult');
            Data.append('TestKey', this.Test.Key.toString());
            Data.append('Index', this.NowLevelIndex.toString());
            Data.append('Finish', finish.toString());
            Data.append('Data', JSON.stringify(DataX));            
            await axios.post('/method', Data);
            this.TestPage = false;
            this.Core.Destroy();
            if(!finish){                
                this.NowLevelIndex++;
                this.LoadLevel();
            }else{
                   this.PageNow = 2;
            }
        }
    },
    watch: {},
    created() {
        this.Test = window.Test;
        this.Levels = window.Levels.Levels;

        window.Test = null;
        window.Levels = null;
        window.Apl = this;
    },
    mounted() {
        this.Canva = document.getElementById("canva");
        this.CoreParent = document.getElementById("testMain");
        this.LoadLevel();

    }

})