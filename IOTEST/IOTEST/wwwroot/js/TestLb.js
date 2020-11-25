'use strict';
var SaveData;
(function (SaveData) {
    class ResultData {
        constructor(Result, MAX, Rule, Settings) {
            this.Max = MAX;
            this.Result = Result;
            this.Rule = Rule;
            this.Settings = Settings;
        }
    }
    SaveData.ResultData = ResultData;
    let Positions;
    (function (Positions) {
        class TObject {
            constructor(x, y, z, s, r, fx = 1, fy = 1) {
                this.X = x;
                this.Y = y;
                this.Z = z;
                this.Size = s;
                this.Rotation = r;
                this.FlipX = fx;
                this.FlipY = fy;
            }
            ;
        }
        Positions.TObject = TObject;
        class Trigger {
            constructor(x, y, s) {
                this.X = x;
                this.Y = y;
                this.Size = s;
            }
        }
        Positions.Trigger = Trigger;
    })(Positions = SaveData.Positions || (SaveData.Positions = {}));
    let Types;
    (function (Types) {
        class TObject {
            constructor(state, group, type, pos, variant, id, cost) {
                this.State = state;
                this.Group = group;
                this.Type = type;
                this.Position = pos;
                this.Variant = variant;
                this.Id = id;
                this.Weight = cost;
            }
        }
        Types.TObject = TObject;
        class Trigger {
            constructor(vis, mag, pos, id, idtypes, tdata) {
                this.Visual = vis;
                this.Magnetic = mag;
                this.Position = pos;
                this.Id = id;
                this.IdTypes = idtypes;
                this.TestData = tdata;
            }
        }
        Types.Trigger = Trigger;
    })(Types = SaveData.Types || (SaveData.Types = {}));
    let InteractorTypes;
    (function (InteractorTypes) {
        let SIWData;
        (function (SIWData) {
            class On {
                constructor(OnName, Data1, Data2, Data3) {
                    this.OnName = OnName;
                    this.Data1 = Data1;
                    this.Data2 = Data2;
                    this.Data3 = Data3;
                }
            }
            SIWData.On = On;
            class Interactor {
                constructor(Type, Data) {
                    this.Type = Type;
                    this.Data = Data;
                }
            }
            SIWData.Interactor = Interactor;
        })(SIWData = InteractorTypes.SIWData || (InteractorTypes.SIWData = {}));
        class SavedInteractorWorker {
            constructor(ids, on, interactor) {
                this.Ids = ids;
                this.On = on;
                this.Interactor = interactor;
                ;
            }
        }
        InteractorTypes.SavedInteractorWorker = SavedInteractorWorker;
    })(InteractorTypes = SaveData.InteractorTypes || (SaveData.InteractorTypes = {}));
    class SavedMap {
        constructor(Bg, objs, trgs, inter, type, TestSettings) {
            this.Objects = objs;
            this.Triggers = trgs;
            this.Interactive = inter;
            this.MapType = type;
            this.TestSettings = TestSettings;
            this.Bg = Bg;
        }
    }
    SaveData.SavedMap = SavedMap;
    class SavedTestSettings {
        constructor(PassRule, Bal) { this.PassRule = PassRule; this.Bal = Bal; }
    }
    SaveData.SavedTestSettings = SavedTestSettings;
    class VisualSavedTest {
        constructor(Name, Cond, MaxBal, Smap) {
            this.Name = Name;
            this.Cond = Cond;
            this.MaxBal = MaxBal;
            this.Smap = Smap;
        }
    }
    SaveData.VisualSavedTest = VisualSavedTest;
    class ClassicSavedTest {
        constructor(Text, MaxBal, TestBase) {
            this.Text = Text;
            this.MaxBal = MaxBal;
            this.TestBase = TestBase;
        }
    }
    SaveData.ClassicSavedTest = ClassicSavedTest;
    class Test {
        constructor(Name, Opis, EndText, OcenType, DispNowBal, MaxBal, Maps) {
            this.Name = Name;
            this.Opis = Opis;
            this.EndText = EndText;
            this.OcenType = OcenType;
            this.DispNowBal = DispNowBal;
            this.MaxBal = MaxBal;
            this.Maps = Maps;
        }
    }
    SaveData.Test = Test;
})(SaveData || (SaveData = {}));
var Interactive;
(function (Interactive) {
    class InteractorWorker {
        constructor(ids, on, interactor) {
            this.Ids = ids;
            this.On = on;
            this.Interactor = interactor;
        }
        Work(SceneSum, Objs, Trgs) {
            this.Interactor.Invoke(this.On.Test(SceneSum, Objs, Trgs), this.Ids, Objs, Trgs);
        }
    }
    Interactive.InteractorWorker = InteractorWorker;
    class Interactor {
        constructor(Saved) {
            var Data = Saved.Data;
            switch (Saved.Type) {
                case "Variator":
                    this.Invoke = (istrue, ids, Objs, Trgs) => {
                        Objs.filter((e) => ids.includes(e.Id)).forEach((t) => {
                            t.SetVariant(istrue ? Data[1] : Data[0]);
                        });
                    };
                    break;
                case "VariatorChange":
                    this.Invoke = (istrue, ids, Objs, Trgs) => {
                        Objs.filter((e) => ids.includes(e.Id)).forEach((t) => {
                            if (istrue) {
                                t.SetVariant(t.Variant == Data[0] ? Data[1] : Data[0]);
                            }
                        });
                    };
                    break;
                case "RotatorSet":
                    this.Invoke = (istrue, ids, Objs, Trgs) => {
                        Objs.filter((e) => ids.includes(e.Id)).forEach((t) => {
                            t.SetRotation(istrue ? Data[1] : Data[0]);
                        });
                    };
                    break;
                case "RotatorAdd":
                    this.Invoke = (istrue, ids, Objs, Trgs) => {
                        Objs.filter((e) => ids.includes(e.Id)).forEach((t) => {
                            t.AddRotation(istrue ? Data[1] : Data[0]);
                        });
                    };
                    break;
                case "Visible":
                    this.Invoke = (istrue, ids, Objs, Trgs) => {
                        Objs.filter((e) => ids.includes(e.Id)).forEach((t) => {
                            t.SetVisible(istrue ? Data[1] : Data[0]);
                        });
                    };
                    break;
                case "CanMove":
                    this.Invoke = (istrue, ids, Objs, Trgs) => {
                        Objs.filter((e) => ids.includes(e.Id)).forEach((t) => {
                            t.SetCanMove(istrue ? Data[1] : Data[0]);
                        });
                    };
                case "IsButton":
                    this.Invoke = (istrue, ids, Objs, Trgs) => {
                        Objs.filter((e) => ids.includes(e.Id)).forEach((t) => {
                            t.SetIsButton(istrue ? Data[1] : Data[0]);
                        });
                    };
                    break;
            }
        }
        Invoke(istrue, ids, Objs, Trgs) { }
    }
    Interactive.Interactor = Interactor;
    class OnEvents {
        static Create(saved) {
            switch (saved.OnName) {
                case "Sum":
                    return new OnEvents.OnSum(saved.Data1, saved.Data2, saved.Data3);
                case "Hover":
                    return new OnEvents.OnHover(saved.Data1);
                case "Always":
                    return new OnEvents.OnAlways(saved.Data1);
                case "Click":
                    return new OnEvents.OnСlick(saved.Data1);
                default:
            }
        }
    }
    OnEvents.BaseEvent = class {
        constructor() {
            this.Invoked = false;
        }
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
    };
    OnEvents.OnSum = class extends OnEvents.BaseEvent {
        constructor(type, agr, ids) {
            super();
            this.Type = type;
            this.Agr = agr;
            this.Ids = ids;
        }
        Test(SceneSum, Obgs, Trgs) {
            if (SceneSum == undefined)
                return false;
            var rt = false;
            switch (this.Type) {
                case "scene":
                    if (eval((SceneSum + this.Agr).toString()))
                        rt = true;
                    break;
                case "trigger":
                    Trgs.filter((e) => this.Ids.includes(e.Id)).forEach((t) => {
                        if (eval((t.Sum + this.Agr).toString()))
                            rt = true;
                        ;
                    });
                    break;
            }
            return rt;
        }
    };
    OnEvents.OnHover = class extends OnEvents.BaseEvent {
        constructor(ids) {
            super();
            this.Ids = ids;
        }
        Test(SceneSum, Obgs, Trgs) {
            var rt = false;
            Obgs.filter((e) => this.Ids.includes(e.Id)).forEach((t) => {
                if (t.MouseOnThis)
                    rt = true;
            });
            return rt;
        }
    };
    OnEvents.OnAlways = class extends OnEvents.BaseEvent {
        constructor(on) {
            super();
            this.On = on;
        }
        Test(SceneSum, Obgs, Trgs) {
            return this.On.toString() == "true";
        }
    };
    OnEvents.OnСlick = class extends OnEvents.BaseEvent {
        constructor(ids) {
            super();
            this.Ids = ids;
        }
        Test(SceneSum, Obgs, Trgs) {
            var rt = false;
            Obgs.filter((e) => this.Ids.includes(e.Id)).forEach((t) => {
                if (t.ReadClick())
                    rt = true;
            });
            return rt;
        }
    };
    Interactive.OnEvents = OnEvents;
})(Interactive || (Interactive = {}));
var Objects;
(function (Objects_1) {
    class Trigger {
        constructor(Size, x, y, visual, magnetic, id, Idt, dt) {
            this.color = 0x2600ff;
            this.Funcs = {
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
            };
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
            // @ts-ignore */}
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
        Work(Objects, Trgs) {
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
                            Sum += this.TestData.includes(e.GroupType + ":" + e.Variant) ? e.Weight : 0;
                            break;
                        case 3:
                            Sum += e.Weight;
                            break;
                        default:
                    }
                }
                if (this.magnetic) {
                    var OnTrg = (this.Funcs.pointInPoly(this.VectorArray, e.sprite.hasposx, e.sprite.hasposy));
                    if (OnTrg) {
                        if (e.sprite.DragClass.Dragging && this.magnetic) {
                            e.sprite.OnTrigger = true;
                            e.sprite.x = this.x;
                            e.sprite.y = this.y;
                        }
                    }
                    else {
                        var OnEnother = false;
                        Trgs.filter((x) => x.magnetic).forEach((tr) => {
                            var OnTrgtr = (tr.Funcs.pointInPoly(tr.VectorArray, e.sprite.hasposx, e.sprite.hasposy));
                            if (OnTrgtr)
                                OnEnother = true;
                        });
                        e.sprite.OnTrigger = OnEnother;
                    }
                }
            });
            this.elementcount = elementcount;
            this.Sum = Sum;
            this.Draw();
        }
    }
    Objects_1.Trigger = Trigger;
    class DragableObject {
        constructor(variants, variant, sx, sy, x, y, r, cc = true, drag = false) {
            if (variants[variant] == undefined)
                this.texture = variants.texture;
            else
                // @ts-ignore */}
                this.texture = PIXI.Texture.from(variants[variant]);
            this.Variant = variant;
            this.Type = variant;
            this.Variants = variants;
            this.Rotation = r;
            this.MouseOnThis = false;
            this.Visible = true;
            // @ts-ignore */}
            this.sprite = new PIXI.Sprite(this.texture);
            this.sprite.x = x || 1;
            this.sprite.y = y || 1;
            this.sprite.scale.set(1);
            this.sprite.scale.x = sx;
            this.sprite.scale.y = sy;
            this.sprite.anchor.set(cc ? 0.5 : 0);
            this.sprite.interactive = true;
            this.sprite.buttonMode = drag;
            this.CanMove = drag;
            this.sprite.rotation = Math.PI / 180 * r;
            this.sprite.DragClass = this;
            this.sprite.OnTrigger = false;
            this.MouseDown = false;
            this.Clicked = false;
            this.sprite
                .on('pointerdown', (e) => this.onDragStart(e))
                .on('pointerup', (e) => this.onDragEnd(e))
                .on('pointerupoutside', (e) => this.onDragEnd(e))
                .on('pointermove', (e) => this.onDragMove(e))
                .on('pointerover', (e) => this.onPointerOver(e))
                .on('pointerout', (e) => this.onPointerOut(e));
        }
        onPointerOver(event) {
            this.MouseOnThis = true;
        }
        onPointerOut(event) {
            this.MouseOnThis = false;
        }
        onDragStart(event) {
            this.MouseDown = true;
            if (!this.CanMove)
                return;
            this.sprite.data = event.data;
            this.sprite.alpha = 0.5;
            this.Dragging = true;
        }
        onDragEnd(event) {
            this.MouseDown = false;
            this.Clicked = true;
            this.sprite.alpha = 1;
            this.Dragging = false;
            this.sprite.data = null;
        }
        onDragMove(event) {
            if (!this.CanMove)
                return;
            if (this.Dragging) {
                const newPosition = this.sprite.data.getLocalPosition(this.sprite.parent);
                this.sprite.hasposx = newPosition.x;
                this.sprite.hasposy = newPosition.y;
                if (!this.sprite.OnTrigger) {
                    this.sprite.x = newPosition.x;
                    this.sprite.y = newPosition.y;
                }
            }
        }
        SetVariant(variant) {
            if (this.Variant == variant)
                return;
            this.Variant = variant;
            // @ts-ignore */}
            this.sprite.texture = this.texture = PIXI.Texture.from(this.Variants[variant]);
        }
        SetRotation(rotation) {
            if (this.Rotation == rotation)
                return;
            this.Rotation = rotation;
            this.sprite.rotation = Math.PI / 180 * this.Rotation;
        }
        AddRotation(rotation) {
            if (0 == rotation)
                return;
            this.Rotation += rotation;
            this.sprite.rotation = Math.PI / 180 * this.Rotation;
        }
        SetVisible(visible) {
            if (this.Visible == visible)
                return;
            this.Visible = visible;
            this.sprite.visible = this.Visible;
        }
        SetCanMove(canmove) {
            if (this.CanMove == canmove)
                return;
            this.CanMove = canmove;
            this.sprite.CanMove = canmove;
            this.sprite.buttonMode = this.Button || canmove;
        }
        SetIsButton(on) {
            if (this.Button == on)
                return;
            this.Button = on;
            this.sprite.buttonMode = on;
        }
        ReadClick() {
            if (this.Clicked) {
                this.Clicked = false;
                return true;
            }
            return false;
        }
    }
    DragableObject.NullTexture = 'TestItems/Prefabs/Shared/Null.png';
    Objects_1.DragableObject = DragableObject;
    class ElectronsObjects extends DragableObject {
        constructor(sx, sy, x, y, r, type, isdragable, varitant) {
            super(type.textures, varitant, sx, sy, x, y, r, true, isdragable);
        }
    }
    ElectronsObjects.Types = {
        Resistor: {
            textures: ['TestItems/Prefabs/Electrons/Resistor.png']
        },
        Led: {
            textures: [
                'TestItems/Prefabs/Electrons/Leds/1.png',
                'TestItems/Prefabs/Electrons/Leds/2.png'
            ]
        },
        Key: {
            textures: [
                'TestItems/Prefabs/Electrons/Keys/1.png',
                'TestItems/Prefabs/Electrons/Keys/2.png'
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
    };
    Objects_1.ElectronsObjects = ElectronsObjects;
    class CustumObject extends DragableObject {
        constructor(sx, sy, x, y, r, type, isdragable, varitant) {
            super(type, varitant, sx, sy, x, y, r, true, isdragable);
        }
    }
    Objects_1.CustumObject = CustumObject;
    class EatObjects extends DragableObject {
        constructor(sx, sy, x, y, r, type, isdragable, varitant) {
            super(type.textures, varitant, sx, sy, x, y, r, true, isdragable);
        }
    }
    EatObjects.Types = {
        Apple: {
            textures: [
                'TestItems/Prefabs/Eat/Apple/0.png',
                'TestItems/Prefabs/Eat/Apple/1.png',
                'TestItems/Prefabs/Eat/Apple/2.png',
                'TestItems/Prefabs/Eat/Apple/3.png',
            ]
        },
        Grapes: {
            textures: [
                'TestItems/Prefabs/Eat/Grapes/0.png',
                'TestItems/Prefabs/Eat/Grapes/1.png',
                'TestItems/Prefabs/Eat/Grapes/2.png',
            ]
        },
        Lemon: {
            textures: [
                'TestItems/Prefabs/Eat/Lemon/0.png',
                'TestItems/Prefabs/Eat/Lemon/1.png',
                'TestItems/Prefabs/Eat/Lemon/2.png',
                'TestItems/Prefabs/Eat/Lemon/3.png',
            ]
        },
        Pear: {
            textures: [
                'TestItems/Prefabs/Eat/Pear/0.png',
                'TestItems/Prefabs/Eat/Pear/1.png',
                'TestItems/Prefabs/Eat/Pear/2.png',
                'TestItems/Prefabs/Eat/Pear/3.png',
            ]
        },
        Raspberry: {
            textures: [
                'TestItems/Prefabs/Eat/Raspberry/0.png',
                'TestItems/Prefabs/Eat/Raspberry/1.png',
                'TestItems/Prefabs/Eat/Raspberry/2.png',
                'TestItems/Prefabs/Eat/Raspberry/3.png',
            ]
        },
        Tomato: {
            textures: [
                'TestItems/Prefabs/Eat/Tomato/0.png',
                'TestItems/Prefabs/Eat/Tomato/1.png',
                'TestItems/Prefabs/Eat/Tomato/2.png',
                'TestItems/Prefabs/Eat/Tomato/3.png',
            ]
        },
        Watermelon: {
            textures: [
                'TestItems/Prefabs/Eat/Watermelon/0.png',
                'TestItems/Prefabs/Eat/Watermelon/1.png',
                'TestItems/Prefabs/Eat/Watermelon/2.png',
                'TestItems/Prefabs/Eat/Watermelon/3.png',
            ]
        },
    };
    Objects_1.EatObjects = EatObjects;
    class Label extends DragableObject {
        constructor(sx, sy, x, y, r, type, isdragable, varitant) {
            // @ts-ignore */}
            var richText = new PIXI.Text(type, Label.Variants[varitant]);
            richText.updateText();
            super(richText, 0, sx, sy, x, y, r, true, isdragable);
        }
    }
    Label.Variants = [
        new PIXI.TextStyle({ fontFamily: 'Arial', fill: ['#ffffff'], fontSize: 120, }),
        new PIXI.TextStyle({ fontFamily: 'Arial', fill: ['#000000'], fontSize: 120, }),
        new PIXI.TextStyle({ fontFamily: 'Arial', fill: ['#ffffff'], stroke: '#000000', strokeThickness: 12, fontSize: 120, }),
        new PIXI.TextStyle({
            fontFamily: 'Arial',
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowAngle: 2.1,
            dropShadowBlur: 4,
            dropShadowColor: "0x111111",
            dropShadowDistance: 10,
            fill: ['#ffffff'],
            stroke: '#004620',
            fontSize: 120,
            fontWeight: "lighter",
            lineJoin: "round",
            strokeThickness: 12
        }),
    ];
    Objects_1.Label = Label;
})(Objects || (Objects = {}));
var Services;
(function (Services) {
    class VisualMap {
        constructor(smap) {
            this.Objects = [];
            this.Triggers = [];
            this.Interactive = [];
            smap.Objects.sort(function (x, y) { return x.Position.Z < y.Position.Z ? -1 : 1; });
            smap.Objects.forEach((e) => {
                switch (e.Group) {
                    case "Electrons":
                        var Obj = new Objects.ElectronsObjects(e.Position.Size * e.Position.FlipX / 100, e.Position.Size * e.Position.FlipY / 100, e.Position.X, e.Position.Y, e.Position.Rotation, Objects.ElectronsObjects.Types[e.Type], e.State == "Dynamic" ? true : false, e.Variant);
                        break;
                    case "Custom":
                        var Obj = new Objects.CustumObject(e.Position.Size * e.Position.FlipX / 100, e.Position.Size * e.Position.FlipY / 100, e.Position.X, e.Position.Y, e.Position.Rotation, e.Type, e.State == "Dynamic" ? true : false, e.Variant);
                        break;
                    case "Eat":
                        var Obj = new Objects.EatObjects(e.Position.Size * e.Position.FlipX / 100, e.Position.Size * e.Position.FlipY / 100, e.Position.X, e.Position.Y, e.Position.Rotation, Objects.EatObjects.Types[e.Type], e.State == "Dynamic" ? true : false, e.Variant);
                        break;
                    case "Label":
                        var Obj = new Objects.Label(e.Position.Size * e.Position.FlipX / 100, e.Position.Size * e.Position.FlipY / 100, e.Position.X, e.Position.Y, e.Position.Rotation, e.Type, e.State == "Dynamic" ? true : false, e.Variant);
                        break;
                    default:
                        console.error(e);
                }
                Obj.GroupType = e.Group + "." + e.Type;
                Obj.Id = e.Id;
                Obj.Weight = e.Weight;
                this.Objects.push(Obj);
            });
            smap.Triggers.forEach((e) => this.Triggers.push(new Objects.Trigger(e.Position.Size, e.Position.X, e.Position.Y, e.Visual, e.Magnetic, e.Id, e.IdTypes, e.TestData)));
            smap.Interactive.forEach((e) => this.Interactive.push(new Interactive.InteractorWorker(e.Ids, Interactive.OnEvents.Create(e.On), new Interactive.Interactor(e.Interactor))));
        }
        Work(SceneSum) {
            this.Interactive.forEach((e) => e.Work(SceneSum, this.Objects, this.Triggers));
            this.Triggers.forEach((e) => e.Work(this.Objects, this.Triggers));
        }
    }
    Services.VisualMap = VisualMap;
    class VisualTest {
        constructor(smap, display) {
            this.Canvas = display;
            // @ts-ignore */}
            this.VDisplay = new PIXI.Application({ width: 750, height: 500, view: this.Canvas, transparent: true, antialias: false, });
            this.Twork = new TestWorker(smap.TestSettings);
            // @ts-ignore */}
            this.VDisplayContainer = new PIXI.Container();
            this.VDisplay.stage.addChild(this.VDisplayContainer);
            this.Canvas.style.background = "url('/TestItems/Prefabs/Backgrounds/" + smap.Bg + ".jpg')";
            this.Canvas.style.backgroundRepeat = "round";
            this.Vmap = new VisualMap(smap);
            this.MapType = smap.MapType;
            this.SceneSum = 0;
            this.Vmap.Triggers.forEach((e) => this.VDisplayContainer.addChild(e.graphics));
            this.Vmap.Objects.forEach((e) => this.VDisplayContainer.addChild(e.sprite));
            this.VDisplay.ticker.add((delta) => this.Worker(delta));
            this.VDisplay.ticker.add((delta) => this.Twork.Work(this.SceneSum));
            window.addEventListener('resize', () => { this.resize(this); });
            this.resize(this);
        }
        Worker(delta) {
            console.log(this.SceneSum);
            this.Vmap.Work(this.SceneSum);
            this.SceneSum = this.Vmap.Triggers.map(function (item) { return item.Sum; }).reduce((a, b) => a + b, 0);
        }
        Pass(max, id, isLast, Key) {
            var Result = new SaveData.ResultData(this.Twork.Passed, max, this.Twork.PassRule, this.Twork.Bal);
            var data = new FormData();
            data.append("method", "AcceptResult");
            data.append("Data", btoa(JSON.stringify(Result)));
            data.append("Num", id.toString());
            data.append("Last", isLast.toString());
            data.append("Test", Key);
            // @ts-ignore */}
            axios.post("/method", data);
        }
        resize(t) {
            let TestWidth = document.getElementById("testMain").clientWidth;
            t.VDisplay.renderer.resize(TestWidth, TestWidth / 3 * 2);
            t.VDisplay.stage.scale.set(TestWidth / 900, TestWidth / 900);
        }
        destroy() {
            this.VDisplay.destroy();
            this.VDisplay = undefined;
            this.Vmap = undefined;
            this.resize = undefined;
            this.VDisplayContainer = undefined;
        }
    }
    Services.VisualTest = VisualTest;
    class TestWorker {
        constructor(TestS) {
            this.Passed = false;
            this.PassRule = TestS.PassRule;
            this.Bal = TestS.Bal;
            this.Work = ((SceneSum) => this.Passed = SceneSum);
        }
    }
    Services.TestWorker = TestWorker;
})(Services || (Services = {}));
export default class VisualTestsWorker {
    constructor(Test, MarkdownEng, Key) {
        this.VisualData = {};
        this.EndData = {};
        this.TestData = Test;
        this.NowTestId = 0;
        this.MaxTestId = Test.Maps.length;
        this.MarkdownEngine = MarkdownEng;
        this.Key = Key;
    }
    LoadLvl() {
        if (this.Vtest != null) {
            this.Vtest.destroy();
            this.Vtest = null;
        }
        var LvlNow = this.TestData.Maps[this.NowTestId];
        this.UpdateVisual(LvlNow.Name, this.NowTestId, this.MaxTestId, LvlNow.MaxBal, LvlNow.Smap.TestSettings.PassRule, LvlNow.Cond);
        this.Vtest = new Services.VisualTest(LvlNow.Smap, this.Canvas);
    }
    ;
    UpdateVisual(Name, id, MaxTestId, MaxBal, PassRule, Conditioten) {
        this.VisualData = {
            Title: "#" + (id + 1).toString() + "/" + MaxTestId.toString() + " " + Name,
            Condition: this.MarkdownEngine.makeHtml(Conditioten),
            MaxBal: MaxBal,
            OcenType: PassRule,
        };
    }
    ;
    Pass(tz) {
        tz.Vtest.Pass(tz.TestData.Maps[tz.NowTestId].MaxBal, tz.NowTestId, ((tz.NowTestId + 1) >= tz.MaxTestId), this.Key);
        if (++tz.NowTestId >= tz.MaxTestId)
            tz.EndTest();
        else
            tz.LoadLvl();
    }
    ;
    EndTest() {
        if (this.Vtest != null)
            this.Vtest.destroy();
        this.Vtest = null;
        var data = new FormData();
        data.append("method", "GetBals");
        data.append("Key", this.Key);
        this.EndData = {
            C: true,
            Bal: "Загрузка",
        };
        // @ts-ignore */}
        setTimeout(() => axios.post("/method", data).then((e) => {
            this.EndData = {
                C: true,
                Bal: e.data,
            };
        }), 300);
        console.log("End");
    }
    Start(Canvas, Num) {
        this.NowTestId = Num + 1;
        this.Canvas = Canvas;
        this.LoadLvl();
    }
}
