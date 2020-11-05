var Map = {
    Objects: [

        { type: "Static.Electrons.Wire", variant: 1, position: { X: 600, Y: 400, Z: -1, S: 20, R: -90 } },
        { type: "Static.Electrons.Wire", variant: 1, position: { X: 100, Y: 400, Z: -1, S: 20, R: 0 } },
        { type: "Static.Electrons.Wire", variant: 0, position: { X: 400, Y: 400, Z: -1, S: 20, R: 0 } },
        { type: "Static.Electrons.Wire", variant: 0, position: { X: 300, Y: 400, Z: -1, S: 20, R: 0 } },
        { type: "Static.Electrons.Wire", variant: 0, position: { X: 600, Y: 300, Z: -1, S: 20, R: 90 } },
        { type: "Static.Electrons.Wire", variant: 0, position: { X: 100, Y: 300, Z: -1, S: 20, R: 90 } },
        { type: "Static.Electrons.Wire", variant: 0, position: { X: 100, Y: 200, Z: -1, S: 20, R: 90 } },
        { type: "Static.Electrons.Wire", variant: 0, position: { X: 600, Y: 200, Z: -1, S: 20, R: 90 } },
        { type: "Static.Electrons.Wire", variant: 1, position: { X: 600, Y: 100, Z: -1, S: 20, R: -180 } },
        { type: "Static.Electrons.Wire", variant: 1, position: { X: 100, Y: 100, Z: -1, S: 20, R: 90 } },
        { type: "Static.Electrons.Wire", variant: 0, position: { X: 500, Y: 100, Z: -1, S: 20, R: 0 } },
        { type: "Static.Electrons.Wire", variant: 0, position: { X: 400, Y: 100, Z: -1, S: 20, R: 0 } },
        { type: "Static.Electrons.Wire", variant: 0, position: { X: 200, Y: 100, Z: -1, S: 20, R: 0 } },
        { type: "Static.Trigger.Visual", variant: 0, position: { X: 300, Y: 100, Z: -1, S: 80, }, magnetic: true },
        { type: "Static.Trigger.Visual", variant: 0, position: { X: 200, Y: 400, Z: -1, S: 80 }, magnetic: true },
        { type: "Static.Trigger.Visual", variant: 0, position: { X: 500, Y: 400, Z: -1, S: 80 }, magnetic: true },
        { type: "Dynamic.Electrons.Led", variant: 0, position: { X: 300, Y: 300, Z: 2, S: 20, R: 0 } },
        { type: "Dynamic.Electrons.Reostat", variant: 0, position: { X: 300, Y: 300, Z: 1, S: 20, R: 0 } },
        { type: "Dynamic.Electrons.Battery", variant: 0, position: { X: 300, Y: 300, Z: 3, S: 20, R: 0 } },



    ]
}
var Elements = [];
var Triggers = [];
Map.Objects.sort(function (x, y) { return x.position.Z < y.position.Z ? -1 : 1 })
Map.Objects.forEach((e) => {
    var elST = e.type.split(".")[0];
    var elClass = e.type.split(".")[1];
    var elType = e.type.split(".")[2];
    switch (elClass) {
        case "Electrons":
            Elements.push(new ElectronsObjects(parseInt(e.position.S) / 100, parseInt(e.position.X), parseInt(e.position.Y), parseInt(e.position.R), ElectronsObjects.Types[elType], elST == "Dynamic" ? true : false, e.variant));
            break;
        case "Trigger":
            Triggers.push(new Trigger(parseInt(e.position.S), parseInt(e.position.X), parseInt(e.position.Y), elType == "Visual" ? true : false, e.magnetic));
            break;
        default:
    }
});
function getPointOfIntersection(startX1, startY1, endX1, endY1, startX2, startY2, endX2, endY2) {
    var d = (startX1 - endX1) * (endY2 - startY2) - (startY1 - endY1) * (endX2 - startX2);
    var da = (startX1 - startX2) * (endY2 - startY2) - (startY1 - startY2) * (endX2 - startX2);
    var db = (startX1 - endX1) * (startY1 - startY2) - (startY1 - endY1) * (startX1 - startX2);

    var ta = da / d;
    var tb = db / d;

    if (ta >= 0 && ta <= 1 && tb >= 0 && tb <= 1) {
        var dx = startX1 + ta * (endX1 - startX1);
        var dy = startY1 + ta * (endY1 - startY1);
        return [dx, dy];
    }

    return [-100, -100];
}
function pointInPoly(poly, pointX, pointY) {
    var i, j, c = false;
    var polyCords = [[poly[0], poly[1]], [poly[2], poly[3]], [poly[4], poly[5]], [poly[6], poly[7]]];
    for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++) {

        if (((polyCords[i][1] > pointY) != (polyCords[j][1] > pointY)) && (pointX < (polyCords[j][0] - polyCords[i][0]) * (pointY - polyCords[i][1]) / (polyCords[j][1] - polyCords[i][1]) + polyCords[i][0])) {
            c = !c;
        }

    }

    return c;
}
var app = new Vue({
    el: "#app",
    data: {
        Vtest: null
    },
    methods: {
        resize() {
            let TestWidth = document.getElementById("testMain").clientWidth;
            this.Vtest.renderer.resize(TestWidth, 500);
        },
        TestStart() {
            this.Vtest = new PIXI.Application({ width: 100, height: 100, view: document.getElementById("MT1"), backgroundColor: 0xf0f0f0, antialias: true, })
            const container = new PIXI.Container();
            this.Vtest.stage.addChild(container);
            Triggers.forEach((e) => {
                container.addChild(e.graphics);
            });
            Elements.forEach((e) => {
                container.addChild(e.sprite);
            });
            this.Vtest.ticker.add((delta) => {
                Triggers.forEach((e) => {
                    e.Draw();
                    var elementcount = 0;
                    Elements.forEach((el) => {
                        if (e.magnetic) {
                            if (pointInPoly(e.VectorArray, el.sprite.x, el.sprite.y)) {
                                elementcount++;
                            }
                        }
                        if (el.sprite.dragging) {
                            if (e.magnetic && pointInPoly(e.VectorArray, el.sprite.hasposx, el.sprite.hasposy)) {
                                el.sprite.OnTrigger = true;
                                el.sprite.x = e.x;
                                el.sprite.y = e.y;
                            } else el.sprite.OnTrigger = false;
                        }

                    })
                    e.elementcount = elementcount;
                    // console.log(e.elementcount);
                });
            });




        }
    },
    mounted() {
        this.$nextTick(function () {
            window.addEventListener('resize', this.resize);
        })
        this.TestStart();
        this.resize();
    }
})
