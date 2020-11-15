class SavedMap {
    constructor(objs, trgs, inter) {
        this.Objects = objs;
        this.Triggers = trgs;
        this.Interactive = inter;

    }
    Objects;
    Triggers;
    Interactive;

}
SavedMap.sObject = class {
    constructor(state, group, type, pos, variant, id, cost) {
        this.State = state;
        this.Group = group;
        this.Type = type;
        this.Position = pos;
        this.Variant = variant;
        this.Id = id;
        this.Weight = cost;
    }
    State;
    Group;
    Type;
    Position;
    Variant;
    Id;
    Weight;
}
SavedMap.sTrigger = class {
    constructor(vis, mag, pos, id, idtypes, tdata) {
        this.Visual = vis;
        this.Magnetic = mag;
        this.Position = pos;
        this.Id = id;
        this.IdTypes = idtypes;
        this.TestData = tdata;
    }
    Visual;
    Magnetic;
    Position;
    Id;
    IdTypes;
    TestData;
}
SavedMap.InteractorWorker = class {
    constructor(ids, on, interactor) {
        this.Ids = ids;
        this.On = on;
        this.Interactor = interactor;
    }
    Work(SceneSum, Objs, Trgs) {
        this.Interactor.Invoke(this.On.Test(SceneSum, Objs, Trgs), this.Ids, Objs, Trgs);
    }
    Ids;
    On;
    Interactor;
}
SavedMap.InteractorWorker.Interactor = class {
    constructor(Type,Data ) {


        switch (Type) {
            case "Variator":
                this.Invoke = (istrue, ids, Objs, Trgs) => {
                    Objs.filter((e) => ids.includes(e.Id)).forEach((t) => {
                        t.SetVariant(istrue ? Data[1] : Data[0]);
                    })
                };
                break;
            case "RotatorSet":
                this.Invoke = (istrue, ids, Objs, Trgs) => {
                    Objs.filter((e) => ids.includes(e.Id)).forEach((t) => {
                        t.SetRotation(istrue ? Data[1] : Data[0]);
                    })
                };
                break;
            case "RotatorAdd":
                this.Invoke = (istrue, ids, Objs, Trgs) => {
                    Objs.filter((e) => ids.includes(e.Id)).forEach((t) => {
                        t.AddRotation(istrue ? Data[1] : Data[0]);
                    })
                };
                break;
            case "Visible":
                this.Invoke = (istrue, ids, Objs, Trgs) => {
                    Objs.filter((e) => ids.includes(e.Id)).forEach((t) => {
                        t.SetVisible(istrue ? Data[1] : Data[0]);
                    })
                };
                break;
        }
   

    }
    Invoke(istrue, ids, Objs, Trgs)
    { }
}
SavedMap.InteractorWorker.onc = class {
    constructor() {
        this.Invoked = false;
    }
    Invoked;
    EventPresented() {
        this.Invoked = true;
    }
    Test(SceneSum, Obgs, Trgs) {

        if (this.Invoked) {
            this.Invoked = false;
            return true;
        }
        return false;
    }
}
SavedMap.InteractorWorker.OnSum = class extends SavedMap.InteractorWorker.onc {
    constructor(type, agr,ids) {
        super();
        this.Type = type;
        this.Agr = agr;
        this.Ids = ids;
    }
    Type;
    Agr;
    Ids;
    Test(SceneSum, Obgs, Trgs) {
        if (SceneSum == undefined) return false;
        var rt = false;
        switch (this.Type) {
            case "scene":
                if (eval((SceneSum + this.Agr).toString())) rt = true;
                break;
            case "trigger":
                Trgs.filter((e) => this.Ids.includes(e.Id)).forEach((t) => {
                    if (eval((t.Sum + this.Agr).toString())) rt = true;;
                })
                break;
        }
        return rt;
    }

}
SavedMap.InteractorWorker.OnHover = class extends SavedMap.InteractorWorker.onc {
    constructor(ids) {
        super();
        this.Ids = ids;
    }
    Ids;
    Test(SceneSum,Obgs, Trgs) {
        var rt = false;
        Obgs.filter((e) => this.Ids.includes(e.Id)).forEach((t) => {          
            if (t.MouseOnThis) rt = true;

        })
        return rt;
    }

}
SavedMap.InteractorWorker.OnAlways = class extends SavedMap.InteractorWorker.onc {
    constructor(on) {
        super();
        this.On = on;
    }
    On;
    Test(SceneSum, Obgs, Trgs) {
        return this.On.toString() == "true";
    }

}

SavedMap.sTrigger.PositionT = class {
    constructor(x, y, s) {
        this.X = x;
        this.Y = y;
        this.Size = s;
    }
    X;
    Y;
    Size;
}
SavedMap.sObject.PositionT = class {
    constructor(x, y, z, s, r, fx = 1, fy = 1) {
        this.X = x;
        this.Y = y;
        this.Z = z;
        this.Size = s;
        this.Rotation = r;
        this.FlipX = fx;
        this.FlipY = fy;
    }
    X;
    Y;
    Z;
    Size;
    Rotation;
    FlipX;
    FlipY;
}
class VisualMap {
    constructor(smap) {
        smap.Objects.sort(function (x, y) { return x.Position.Z < y.Position.Z ? -1 : 1 })
        smap.Objects.forEach((e) => {
            switch (e.Group) {
                case "Electrons":
                    var Obj = new ElectronsObjects(parseInt(e.Position.Size * e.Position.FlipX) / 100, parseInt(e.Position.Size * e.Position.FlipY) / 100, parseInt(e.Position.X), parseInt(e.Position.Y), parseInt(e.Position.Rotation), ElectronsObjects.Types[e.Type], e.State == "Dynamic" ? true : false, e.Variant);
                    Obj.GroupType = e.Group + "." + e.Type;
                    Obj.Id = e.Id;
                    Obj.Weight = e.Weight;
                    this.Objects.push(Obj);
                    break;
                default:
                    console.error(e);
            }
        });
        smap.Triggers.forEach((e) => {
            this.Triggers.push(new Trigger(e.Position.Size, e.Position.X, e.Position.Y, e.Visual, e.Magnetic, e.Id, e.IdTypes, e.TestData));

        });
        smap.Interactive.forEach((e) => {
            this.Interactive.push(e);

        });
    }
    Work(SceneSum) {

        this.Triggers.forEach((e) => e.Work(this.Objects));
        this.Interactive.forEach((e) => e.Work(SceneSum, this.Objects, this.Triggers));
    }
    Objects = [];
    Triggers = [];
    Interactive = [];
}
class VisualTest {
    constructor(smap, display) {
        this.Canvas = display;
        this.VDisplay = new PIXI.Application({ width: 750, height: 500, view: this.Canvas, backgroundColor: 0xf0f0f0, antialias: true, })
        this.VDisplayContainer = new PIXI.Container();
        this.VDisplay.stage.addChild(this.VDisplayContainer);
        this.Vmap = new VisualMap(smap);
        this.Vmap.Triggers.forEach((e) => this.VDisplayContainer.addChild(e.graphics));
        this.Vmap.Objects.forEach((e) => this.VDisplayContainer.addChild(e.sprite));
        this.VDisplay.ticker.add((delta) => this.TestWorker(delta));
        window.addEventListener('resize', () => { this.resize(this); });
        this.resize(this);
    }
    TestWorker(delta) {
        this.Vmap.Work(this.SceneSum);
        this.SceneSum = this.Vmap.Triggers.map(function (item) { return item.Sum; }).reduce((a, b) => a + b, 0);
    }
    VDisplay;
    VDisplayContainer;
    Vmap;
    Canvas;
    SceneSum;
    resize(t) {
        let TestWidth = document.getElementById("testMain").clientWidth;
        t.VDisplay.renderer.resize(TestWidth, TestWidth / 3 * 2);
        t.VDisplay.stage.scale.set(TestWidth / 900, TestWidth / 900);
    }
    destroy() {
        console.log("destroy");
        this.VDisplay.destroy();
        this.VDisplay = undefined;
        this.Vmap = undefined;
        this.Funcs = undefined;
        this.resize = undefined;
        this.VDisplayContainer = undefined;
    }
}
class DragableObject {
    static NullTexture = 'TestItems/Prefabs/Shared/Null.png';
    constructor(variants, variant, sx, sy, x, y, r, cc = true, drag = false) {
        this.texture = PIXI.Texture.from(variants[variant]);
        this.Variant = variant;
        this.Variants = variants;
        this.Rotation = r;
        this.MouseOnThis = false;
        this.Visible = true;
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.x = x || 1;
        this.sprite.y = y || 1;
        this.sprite.scale.set(1);
        this.sprite.scale.x = sx;
        this.sprite.scale.y = sy;
        this.sprite.anchor.set(cc ? 0.5 : 0);
        this.sprite.interactive = true;
        this.sprite.buttonMode = drag;
        this.sprite.CanMove = drag;
        this.sprite.rotation = Math.PI / 180 * r;
        this.sprite
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove)
            .on('pointerover', () =>this.onPointerOver(this))
            .on('pointerout', () =>this.onPointerOut(this));
    }
    Variant;
    Variants;
    texture;
    sprite;
    MouseOnThis;
    GroupType;
    Id;
    Weight;
    Rotation;
    Visible;
    Button;
    CanMove;
    onPointerOver(tz) {

        tz.MouseOnThis = true;
    }
    onPointerOut(tz) {
        tz.MouseOnThis = false;
    }
    onDragStart(event) {
        if (this.CanMove) {
            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;
        }

    }
    onDragEnd(event) {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }
    onDragMove(event) {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.hasposx = newPosition.x;
            this.hasposy = newPosition.y;
            if (!this.OnTrigger) {
                this.x = newPosition.x;
                this.y = newPosition.y;
            }

        }
    }
    SetVariant(variant) {
        if (this.Variant == variant) return;
        this.Variant = variant;
        this.sprite.texture = this.texture = PIXI.Texture.from(this.Variants[variant]);
        console.log(variant);
    }
    SetRotation(rotation) {
        if (this.Rotation == rotation) return;
        this.Rotation = rotation;
        this.sprite.rotation = Math.PI / 180 * this.Rotation;
        console.log(rotation);
    }
    AddRotation(rotation) {
        if (0 == rotation) return;
        this.Rotation += rotation;
        this.sprite.rotation = Math.PI / 180 * this.Rotation;
        console.log(rotation);
    }
    SetVisible(visible) {
        if (this.Visible == visible) return;
        this.Visible = visible;
        this.sprite.visible = this.Visible;
        console.log(visible);
    }
    SetCanMove(canmove) {
        if (this.CanMove == canmove) return;
        this.canmove = canmove;




    }
} 
class ElectronsObjects extends DragableObject {
    static Types = {
        Resistor: {
            textures: ['TestItems/Prefabs/Electrons/Resistor.png']
        },
        Led: {
            textures: [
                'TestItems/Prefabs/Electrons/Leds/1.png',
                'TestItems/Prefabs/Electrons/Leds/2.png'
            ]
        },
        Battery: {
            textures: ['TestItems/Prefabs/Electrons/Galvanic.png']
        },
        Capacitor: {
            textures: ['TestItems/Prefabs/Electrons/Capacitor.png']
        },
        Wire: {
            textures: [
                'TestItems/Prefabs/Electrons/Wires/1.png',
                'TestItems/Prefabs/Electrons/Wires/2.png',
            ]
        },
        Reostat: {
            textures: ['TestItems/Prefabs/Electrons/Reostat.png']
        },
    }
    constructor(sx, sy, x, y, r, type, isdragable, varitant) {
        var texture = type.textures[varitant];
        if (texture === undefined) texture = DragableObject.NullTexture;
        super(type.textures, varitant, sx, sy, x, y, r, true, isdragable);
        this.type = type;
    }
    type;

}
class Trigger {
    constructor(Size, x, y, visual, magnetic, id, Idt, dt) {
        this.magnetic = magnetic;
        this.x = x;
        this.y = y;
        this.visual = visual;
        this.Id = id;
        this.IdTypes = Idt;
        this.TestData = dt;
        this.Size = Size;
        this.elementcount = 0;
        this.VectorArray = [];
        this.VectorArray.push(this.x - this.Size, this.y - this.Size, this.x + this.Size, this.y - this.Size, this.x + this.Size, this.y + this.Size, this.x - this.Size, this.y + this.Size);
        this.graphics = new PIXI.Graphics();
    }
    Draw() {
        this.graphics.clear();
        this.VectorArray = [];
        this.VectorArray.push(this.x - this.Size, this.y - this.Size, this.x + this.Size, this.y - this.Size, this.x + this.Size, this.y + this.Size, this.x - this.Size, this.y + this.Size);
        this.graphics.lineStyle(0);
        this.graphics.beginFill(this.color, this.visual ? 0.5 : 0);
        this.graphics.drawPolygon(this.VectorArray);
        this.graphics.endFill();
    }
    Work(Objects) {
        var elementcount = 0;
        var Sum = 0;

        Objects.forEach((e) => {
            var OnTrigger = this.Funcs.pointInPoly(this.VectorArray, e.sprite.x, e.sprite.y);

            if (OnTrigger) {
                elementcount += 1;
                switch (this.IdTypes) {
                    case 0:
                        Sum += this.TestData.includes(e.GroupType) ? e.Weight : 0;
                        break;
                    case 1:
                        Sum += this.TestData.includes(e.Id) ? e.Weight : 0;
                        break;
                    case 2:
                        Sum += e.Weight;
                        break;
                    default:
                }
            }

            if (e.sprite.dragging && (e.sprite.OnTrigger = (this.magnetic && this.Funcs.pointInPoly(this.VectorArray, e.sprite.hasposx, e.sprite.hasposy)))) {
                e.sprite.x = this.x;
                e.sprite.y = this.y;
            }
        });
        this.elementcount = elementcount;
        this.Sum = Sum;
        this.Draw();

    }
    color = 0x2600ff;
    graphics;
    VectorArray;
    x;
    y;
    Size;
    visual;
    Id;
    IdTypes;
    Sum;
    TestData;
    elementcount;
    Funcs = {
        getPointOfIntersection(startX1, startY1, endX1, endY1, startX2, startY2, endX2, endY2) {
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
        },
        pointInPoly(poly, pointX, pointY) {
            var i, j, c = false;
            var polyCords = [[poly[0], poly[1]], [poly[2], poly[3]], [poly[4], poly[5]], [poly[6], poly[7]]];
            for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++) {

                if (((polyCords[i][1] > pointY) != (polyCords[j][1] > pointY)) && (pointX < (polyCords[j][0] - polyCords[i][0]) * (pointY - polyCords[i][1]) / (polyCords[j][1] - polyCords[i][1]) + polyCords[i][0])) {
                    c = !c;
                }

            }

            return c;
        }
    }
}