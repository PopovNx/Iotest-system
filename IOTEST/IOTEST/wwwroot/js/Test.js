'use strict';
var Smap = new SavedMap(
    [
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(100 + 150, 100, 1, 15, 0), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175 + 150, 100, 1, 15, 0), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(250 + 150, 100, 1, 15, 0), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(400 + 150, 100, 1, 15, 0), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(475 + 150, 100, 1, 15, 0), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(550 + 150, 100, 1, 15, 180), 1, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(550 + 150, 175, 1, 15, 90), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(550 + 150, 250, 1, 15, 90), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(550 + 150, 325, 1, 15, 90), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(550 + 150, 400, 1, 15, -90), 1, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(475 + 150, 400, 1, 15, 0), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(400 + 150, 400, 1, 15, 0), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(100 + 150, 400, 1, 15, 0), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175 + 150, 400, 1, 15, 0), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(250 + 150, 400, 1, 15, 0), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175, 400, 1, 15, 0), 1, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175, 325, 1, 15, 90), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175, 250, 1, 15, 90), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175, 175, 1, 15, 90), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175, 100, 1, 15, 90), 1, 0, 1),



        new SavedMap.sObject("Dynamic", "Electrons", "Led", new SavedMap.sObject.PositionT(100, 200, 1, 20, 0,-1,1), 0, 1, 3),
        new SavedMap.sObject("Dynamic", "Electrons", "Battery", new SavedMap.sObject.PositionT(100, 300, 1, 20, 0), 0, 2, 2),

    ],
    [
        new SavedMap.sTrigger(true, true, new SavedMap.sTrigger.PositionT(325 + 150, 100, 50), 1, 1, [2]),
        new SavedMap.sTrigger(true, true, new SavedMap.sTrigger.PositionT(325 + 150, 400, 50), 1, 1, [1]),
        //    new SavedMap.sTrigger(true,false,new SavedMap.sTrigger.PositionT(500,300,50),1),
    ],
    [
             new SavedMap.InteractorWorker([1], new SavedMap.InteractorWorker.OnHover([1]), new SavedMap.InteractorWorker.Interactor("Variator",[0,1])),
        new SavedMap.InteractorWorker([2], new SavedMap.InteractorWorker.OnSum("scene", ">=2"), new SavedMap.InteractorWorker.Interactor("RotatorSet", [0, 90])),
    ]

);
var app = new Vue({
    el: "#app",
    data: {
        Vtest: null
    },
    methods: {


    },
    mounted() {
        this.Vtest = new VisualTest(Smap, document.getElementById("MT1"));
    }
})
