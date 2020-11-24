'use strict';
import { SaveData, VisualTestsWorker } from "/TsLibs/TestLib.js";

let app = new Vue({
    el: "#app",
    data: {
        Test: {},
        DblockNow: 0,
        PageNow: "Test",
        PreTestData: {},
        ToTest:"",
    },
    methods: {

    },
    watch: {
        "Test.VisualData": function (e) {
            this.DblockNow = 0;
        },
        "Test.EndData": function (e) {
            if (e.C == true)
                this.PageNow = "End";
        },
    },
    created() {


        
        if(!NO) this.PreTestData = JSON.parse(JSON.stringify(Test));
        if (!NO) this.Test = new VisualTestsWorker(Test, new showdown.Converter());
    },
    mounted() {
      
        if (!Ended)         
            if (!NO) this.Test.Start(document.getElementById("MT1"), NumLast);
        if (Ended) this.Test.EndTest();
        
        if (!NO) Test = undefined;
        this.PageNow = "Start";
        if (Ended) this.PageNow = "End";
    }
})
