'use strict';
var cond1 = {
    Name: "Создание схемы",
    Smap: new SavedMap("7",
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
        ], [new SavedMap.sTrigger(false, true, new SavedMap.sTrigger.PositionT(325 + 150, 100, 50), 0, 0, ["Electrons.Battery"]), new SavedMap.sTrigger(false, true, new SavedMap.sTrigger.PositionT(325 + 150, 400, 50), 0, 0, ["Electrons.Led"]), new SavedMap.sTrigger(false, false, new SavedMap.sTrigger.PositionT(325, 400, 50), 0, 2, ["Electrons.Key:1"]),], [
        new SavedMap.InteractorWorker([3], new SavedMap.InteractorWorker.On("Click", [3]), new SavedMap.InteractorWorker.Interactor("VariatorChange", [0, 1])),
        new SavedMap.InteractorWorker([1], new SavedMap.InteractorWorker.On("Sum", "scene", ">=5"), new SavedMap.InteractorWorker.Interactor("Variator", [0, 1])),
        new SavedMap.InteractorWorker([3], new SavedMap.InteractorWorker.On("Always", true), new SavedMap.InteractorWorker.Interactor("IsButton", [0, 1]))
    ], "Test", new SavedMap.TestS("SumPass", 5)),
    Cond: "## Задание 1\n###### Первое задание будет простым, нужно всего лишь заставить данный светодиод светится в электронной схеме, а затем нажать на кнопочку сдать",
    MaxBal:5,

}

var Test = {
    Name: "Электрические схемы",
    Opis: "Данный тест покажет ваши базовые знания электрических схем и электронных компонентов",
    EndText: ["Материалы для повторения:", "Стр 16-29 п4-6", "Стр 30 определение наизусть"],
    OcenType: "Sum",
    DispNowBal: true,
    MaxBal: 12,
    Maps: [
        cond1,
        cond1,
        cond1,

    ]

}




let app = new Vue({
    el: "#app",
    data: {
        Test: {},
        DblockNow: 0,
        PageNow: "Test",
        PreTestData: {},
    },
    methods: {

    },
    watch: {
        "Test.VisualData": function (e) {
            this.DblockNow = 0;
        },
        "Test.EndData": function (e) {
            if(e.C==true)
            this.PageNow = "End";
        },
    },
    created() {
        this.PreTestData = Test;
        this.Test = new VisualTestsWorker(Test, new showdown.Converter());
       
    },
    mounted() {
        this.Test.Start(document.getElementById("MT1"));
        this.PageNow = "Start";
    }
})
