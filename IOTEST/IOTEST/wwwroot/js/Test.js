let app = new Vue({
    el: "#app",
    data: {
        PageNow: 0,
        Test: null,
        Levels: null,

        LevelNow: null,

        TestPage: false,
        CanvaHolder: null,
        CoreParent: null,
        Core: null,

        NowLevelIndex: 0,
        Finish:false,
        
        Mark:"Расчёт",
    },
    methods: {
        LoadLevel() {
            this.LevelNow = this.Levels[this.NowLevelIndex];
            
            this.Core = new TestCore(this.CanvaHolder, this.CoreParent, this.LevelNow, true, false);
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
                const Data = new FormData();
                Data.append('method', 'GetMark');
                Data.append('TestKey', this.Test.Key.toString());
                const result = await axios.post('/method', Data);
                console.log(result)
                this.Mark = result.data;
            }
        }
    },
    watch: {},
    created() {
        if( !window.Disabled) {
            this.Test = window.Test;
            this.Levels = window.Levels.Levels;
            this.Finish = window.Finish;
            this.NowLevelIndex = window.Index;
            window.Test = null;
            window.Levels = null;
            window.Finish = null;
            window.Index = null;
            window.Apl = this;
        }
    },
    mounted() {
        if( !window.Disabled){
            if(!this.Finish){
                this.CanvaHolder = document.getElementById("canvaHolder");
                this.CoreParent = document.getElementById("testMain");
                this.LoadLevel();
            }else{
                this.PageNow = 2;
                this.Mark = window.Mark;
            }
        }
     
        

    }

})