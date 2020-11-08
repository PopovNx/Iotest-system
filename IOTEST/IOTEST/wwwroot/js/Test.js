'use strict';
var Smap = new SavedMap(
    [
        new SavedMap.sObject("Dynamic", "Electrons", "Led",     new SavedMap.sObject.PositionT(100, 300, 1, 20, 45),0, 0, 1),
        new SavedMap.sObject("Dynamic", "Electrons", "Battery", new SavedMap.sObject.PositionT(400, 200, 0, 40, 0), 0, 1, 1),
    ],
    [

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
