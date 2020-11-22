'use strict';
import { SaveData, VisualSavedTest, ClassicSavedTest, VisualTestsWorker } from "/TsLibs/TestLib.js";

var cond1 = new VisualSavedTest(
    "Создание схемы",
    "## Задание 1\n###### Первое задание будет простым, нужно всего лишь заставить данный светодиод светится в электронной схеме, а затем нажать на кнопочку сдать",
    5,
    new SaveData.SavedMap("7",
        [
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(100 + 150, 100, 1, 15, 0), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(175 + 150, 100, 1, 15, 0), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(250 + 150, 100, 1, 15, 0), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(400 + 150, 100, 1, 15, 0), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(475 + 150, 100, 1, 15, 0), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(550 + 150, 100, 1, 15, 180), 1, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(550 + 150, 175, 1, 15, 90), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(550 + 150, 250, 1, 15, 90), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(550 + 150, 325, 1, 15, 90), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(550 + 150, 400, 1, 15, -90), 1, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(475 + 150, 400, 1, 15, 0), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(400 + 150, 400, 1, 15, 0), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(100 + 150, 400, 1, 15, 0), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(250 + 150, 400, 1, 15, 0), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(175, 400, 1, 15, 0), 1, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(175, 325, 1, 15, 90), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(175, 250, 1, 15, 90), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(175, 175, 1, 15, 90), 0, 0, 1),
            new SaveData.SavedObject("Static", "Electrons", "Wire", new SaveData.Positions.PObject(175, 100, 1, 15, 90), 1, 0, 1),
            new SaveData.SavedObject("Dynamic", "Electrons", "Led", new SaveData.Positions.PObject(100, 200, 1, 20, 0, -1, 1), 0, 1, 2),
            new SaveData.SavedObject("Dynamic", "Electrons", "Battery", new SaveData.Positions.PObject(100, 300, 1, 20, 0), 0, 2, 2),
            new SaveData.SavedObject("Static", "Electrons", "Key", new SaveData.Positions.PObject(325, 400, 1, 15, 0), 0, 3, 1),
        ],
        [
            new SaveData.SavedTrigger(false, true, new SaveData.Positions.PTrigger(325 + 150, 100, 50), 0, 0, ["Electrons.Battery"]),
            new SaveData.SavedTrigger(false, true, new SaveData.Positions.PTrigger(325 + 150, 400, 50), 0, 0, ["Electrons.Led"]),
            new SaveData.SavedTrigger(false, false, new SaveData.Positions.PTrigger(325, 400, 50), 0, 2, ["Electrons.Key:1"]),
        ], 
        [
            new SaveData.SavedInteractorWorker([3], new SaveData.SavedInteractorWorker.On("Click", [3]), new SaveData.SavedInteractorWorker.Interactor("VariatorChange", [0, 1])),
            new SaveData.SavedInteractorWorker([1], new SaveData.SavedInteractorWorker.On("Sum", "scene", ">=5"), new SaveData.SavedInteractorWorker.Interactor("Variator", [0, 1])),
            new SaveData.SavedInteractorWorker([3], new SaveData.SavedInteractorWorker.On("Always", true), new SaveData.SavedInteractorWorker.Interactor("IsButton", [0, 1]))
        ], "Test", new SaveData.SavedTestSettings("SumPass", 5)),
);


var Cond2 = new ClassicSavedTest("В каком году открыли что-то там", 3,)

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
            if (e.C == true)
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
