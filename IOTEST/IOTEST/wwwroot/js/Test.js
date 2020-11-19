'use strict';
var Smap1 = new SavedMap("1",
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
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(250 + 150, 400, 1, 15, 0), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175, 400, 1, 15, 0), 1, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175, 325, 1, 15, 90), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175, 250, 1, 15, 90), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175, 175, 1, 15, 90), 0, 0, 1),
        new SavedMap.sObject("Static", "Electrons", "Wire", new SavedMap.sObject.PositionT(175, 100, 1, 15, 90), 1, 0, 1),
        new SavedMap.sObject("Dynamic", "Electrons", "Led", new SavedMap.sObject.PositionT(100, 200, 1, 20, 0, -1, 1), 0, 1, 2),
        new SavedMap.sObject("Dynamic", "Electrons", "Battery", new SavedMap.sObject.PositionT(100, 300, 1, 20, 0), 0, 2, 2),
        new SavedMap.sObject("Static", "Electrons", "Key", new SavedMap.sObject.PositionT(325, 400, 1, 15, 0), 0, 3, 1),
    ],
    [
        new SavedMap.sTrigger(false, true, new SavedMap.sTrigger.PositionT(325 + 150, 100, 50), 0, 0, ["Electrons.Battery"]),
        new SavedMap.sTrigger(false, true, new SavedMap.sTrigger.PositionT(325 + 150, 400, 50), 0, 0, ["Electrons.Led"]),
        new SavedMap.sTrigger(false, false, new SavedMap.sTrigger.PositionT(325, 400, 50), 0, 2, ["Electrons.Key:1"]),
    ],
    [
        new SavedMap.InteractorWorker([3], new SavedMap.InteractorWorker.On("Click", [3]), new SavedMap.InteractorWorker.Interactor("VariatorChange", [0, 1])),
        new SavedMap.InteractorWorker([1], new SavedMap.InteractorWorker.On("Sum", "scene", ">=5"), new SavedMap.InteractorWorker.Interactor("Variator", [0, 1])),
        new SavedMap.InteractorWorker([3], new SavedMap.InteractorWorker.On("Always", true), new SavedMap.InteractorWorker.Interactor("IsButton", [0, 1]))
    ], "Test"

);
var app = new Vue({
    el: "#app",
    data: {
        Vtest: null
    },
    methods: {


    },
    mounted() {
        this.Vtest = new VisualTest(Smap1, document.getElementById("MT1"));
    }
})
