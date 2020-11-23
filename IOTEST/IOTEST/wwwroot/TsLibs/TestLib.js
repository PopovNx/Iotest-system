'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
export var SaveData;
(function (SaveData) {
    var ResultData = /** @class */ (function () {
        function ResultData(Result, MAX, Rule, Settings) {
            this.Max = MAX;
            this.Result = Result;
            this.Rule = Rule;
            this.Settings = Settings;
        }
        return ResultData;
    }());
    SaveData.ResultData = ResultData;
    var Positions;
    (function (Positions) {
        var TObject = /** @class */ (function () {
            function TObject(x, y, z, s, r, fx, fy) {
                if (fx === void 0) { fx = 1; }
                if (fy === void 0) { fy = 1; }
                this.X = x;
                this.Y = y;
                this.Z = z;
                this.Size = s;
                this.Rotation = r;
                this.FlipX = fx;
                this.FlipY = fy;
            }
            ;
            return TObject;
        }());
        Positions.TObject = TObject;
        var Trigger = /** @class */ (function () {
            function Trigger(x, y, s) {
                this.X = x;
                this.Y = y;
                this.Size = s;
            }
            return Trigger;
        }());
        Positions.Trigger = Trigger;
    })(Positions = SaveData.Positions || (SaveData.Positions = {}));
    var Types;
    (function (Types) {
        var TObject = /** @class */ (function () {
            function TObject(state, group, type, pos, variant, id, cost) {
                this.State = state;
                this.Group = group;
                this.Type = type;
                this.Position = pos;
                this.Variant = variant;
                this.Id = id;
                this.Weight = cost;
            }
            return TObject;
        }());
        Types.TObject = TObject;
        var Trigger = /** @class */ (function () {
            function Trigger(vis, mag, pos, id, idtypes, tdata) {
                this.Visual = vis;
                this.Magnetic = mag;
                this.Position = pos;
                this.Id = id;
                this.IdTypes = idtypes;
                this.TestData = tdata;
            }
            return Trigger;
        }());
        Types.Trigger = Trigger;
    })(Types = SaveData.Types || (SaveData.Types = {}));
    var InteractorTypes;
    (function (InteractorTypes) {
        var SIWData;
        (function (SIWData) {
            var On = /** @class */ (function () {
                function On(OnName, Data1, Data2, Data3) {
                    this.OnName = OnName;
                    this.Data1 = Data1;
                    this.Data2 = Data2;
                    this.Data3 = Data3;
                }
                return On;
            }());
            SIWData.On = On;
            var Interactor = /** @class */ (function () {
                function Interactor(Type, Data) {
                    this.Type = Type;
                    this.Data = Data;
                }
                return Interactor;
            }());
            SIWData.Interactor = Interactor;
        })(SIWData = InteractorTypes.SIWData || (InteractorTypes.SIWData = {}));
        var SavedInteractorWorker = /** @class */ (function () {
            function SavedInteractorWorker(ids, on, interactor) {
                this.Ids = ids;
                this.On = on;
                this.Interactor = interactor;
                ;
            }
            return SavedInteractorWorker;
        }());
        InteractorTypes.SavedInteractorWorker = SavedInteractorWorker;
    })(InteractorTypes = SaveData.InteractorTypes || (SaveData.InteractorTypes = {}));
    var SavedMap = /** @class */ (function () {
        function SavedMap(Bg, objs, trgs, inter, type, TestSettings) {
            this.Objects = objs;
            this.Triggers = trgs;
            this.Interactive = inter;
            this.MapType = type;
            this.TestSettings = TestSettings;
            this.Bg = Bg;
        }
        return SavedMap;
    }());
    SaveData.SavedMap = SavedMap;
    var SavedTestSettings = /** @class */ (function () {
        function SavedTestSettings(PassRule, Bal) {
            this.PassRule = PassRule;
            this.Bal = Bal;
        }
        return SavedTestSettings;
    }());
    SaveData.SavedTestSettings = SavedTestSettings;
    var VisualSavedTest = /** @class */ (function () {
        function VisualSavedTest(Name, Cond, MaxBal, Smap) {
            this.Name = Name;
            this.Cond = Cond;
            this.MaxBal = MaxBal;
            this.Smap = Smap;
        }
        return VisualSavedTest;
    }());
    SaveData.VisualSavedTest = VisualSavedTest;
    var ClassicSavedTest = /** @class */ (function () {
        function ClassicSavedTest(Text, MaxBal, TestBase) {
            this.Text = Text;
            this.MaxBal = MaxBal;
            this.TestBase = TestBase;
        }
        return ClassicSavedTest;
    }());
    SaveData.ClassicSavedTest = ClassicSavedTest;
    var Test = /** @class */ (function () {
        function Test(Name, Opis, EndText, OcenType, DispNowBal, MaxBal, Maps) {
            this.Name = Name;
            this.Opis = Opis;
            this.EndText = EndText;
            this.OcenType = OcenType;
            this.DispNowBal = DispNowBal;
            this.MaxBal = MaxBal;
            this.Maps = Maps;
        }
        return Test;
    }());
    SaveData.Test = Test;
})(SaveData || (SaveData = {}));
var Interactive;
(function (Interactive) {
    var InteractorWorker = /** @class */ (function () {
        function InteractorWorker(ids, on, interactor) {
            this.Ids = ids;
            this.On = on;
            this.Interactor = interactor;
        }
        InteractorWorker.prototype.Work = function (SceneSum, Objs, Trgs) {
            this.Interactor.Invoke(this.On.Test(SceneSum, Objs, Trgs), this.Ids, Objs, Trgs);
        };
        return InteractorWorker;
    }());
    Interactive.InteractorWorker = InteractorWorker;
    var Interactor = /** @class */ (function () {
        function Interactor(Saved) {
            var Data = Saved.Data;
            switch (Saved.Type) {
                case "Variator":
                    this.Invoke = function (istrue, ids, Objs, Trgs) {
                        Objs.filter(function (e) { return ids.includes(e.Id); }).forEach(function (t) {
                            t.SetVariant(istrue ? Data[1] : Data[0]);
                        });
                    };
                    break;
                case "VariatorChange":
                    this.Invoke = function (istrue, ids, Objs, Trgs) {
                        Objs.filter(function (e) { return ids.includes(e.Id); }).forEach(function (t) {
                            if (istrue) {
                                t.SetVariant(t.Variant == Data[0] ? Data[1] : Data[0]);
                            }
                        });
                    };
                    break;
                case "RotatorSet":
                    this.Invoke = function (istrue, ids, Objs, Trgs) {
                        Objs.filter(function (e) { return ids.includes(e.Id); }).forEach(function (t) {
                            t.SetRotation(istrue ? Data[1] : Data[0]);
                        });
                    };
                    break;
                case "RotatorAdd":
                    this.Invoke = function (istrue, ids, Objs, Trgs) {
                        Objs.filter(function (e) { return ids.includes(e.Id); }).forEach(function (t) {
                            t.AddRotation(istrue ? Data[1] : Data[0]);
                        });
                    };
                    break;
                case "Visible":
                    this.Invoke = function (istrue, ids, Objs, Trgs) {
                        Objs.filter(function (e) { return ids.includes(e.Id); }).forEach(function (t) {
                            t.SetVisible(istrue ? Data[1] : Data[0]);
                        });
                    };
                    break;
                case "CanMove":
                    this.Invoke = function (istrue, ids, Objs, Trgs) {
                        Objs.filter(function (e) { return ids.includes(e.Id); }).forEach(function (t) {
                            t.SetCanMove(istrue ? Data[1] : Data[0]);
                        });
                    };
                case "IsButton":
                    this.Invoke = function (istrue, ids, Objs, Trgs) {
                        Objs.filter(function (e) { return ids.includes(e.Id); }).forEach(function (t) {
                            t.SetIsButton(istrue ? Data[1] : Data[0]);
                        });
                    };
                    break;
            }
        }
        Interactor.prototype.Invoke = function (istrue, ids, Objs, Trgs) { };
        return Interactor;
    }());
    Interactive.Interactor = Interactor;
    var OnEvents = /** @class */ (function () {
        function OnEvents() {
        }
        OnEvents.Create = function (saved) {
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
        };
        OnEvents.BaseEvent = /** @class */ (function () {
            function class_1() {
                this.Invoked = false;
            }
            class_1.prototype.EventPresented = function () {
                this.Invoked = true;
            };
            class_1.prototype.Test = function (SceneSum, Obgs, Trgs) {
                if (this.Invoked) {
                    this.Invoked = false;
                    return true;
                }
                return false;
            };
            return class_1;
        }());
        OnEvents.OnSum = /** @class */ (function (_super) {
            __extends(class_2, _super);
            function class_2(type, agr, ids) {
                var _this = _super.call(this) || this;
                _this.Type = type;
                _this.Agr = agr;
                _this.Ids = ids;
                return _this;
            }
            class_2.prototype.Test = function (SceneSum, Obgs, Trgs) {
                var _this = this;
                if (SceneSum == undefined)
                    return false;
                var rt = false;
                switch (this.Type) {
                    case "scene":
                        if (eval((SceneSum + this.Agr).toString()))
                            rt = true;
                        break;
                    case "trigger":
                        Trgs.filter(function (e) { return _this.Ids.includes(e.Id); }).forEach(function (t) {
                            if (eval((t.Sum + _this.Agr).toString()))
                                rt = true;
                            ;
                        });
                        break;
                }
                return rt;
            };
            return class_2;
        }(OnEvents.BaseEvent));
        OnEvents.OnHover = /** @class */ (function (_super) {
            __extends(class_3, _super);
            function class_3(ids) {
                var _this = _super.call(this) || this;
                _this.Ids = ids;
                return _this;
            }
            class_3.prototype.Test = function (SceneSum, Obgs, Trgs) {
                var _this = this;
                var rt = false;
                Obgs.filter(function (e) { return _this.Ids.includes(e.Id); }).forEach(function (t) {
                    if (t.MouseOnThis)
                        rt = true;
                });
                return rt;
            };
            return class_3;
        }(OnEvents.BaseEvent));
        OnEvents.OnAlways = /** @class */ (function (_super) {
            __extends(class_4, _super);
            function class_4(on) {
                var _this = _super.call(this) || this;
                _this.On = on;
                return _this;
            }
            class_4.prototype.Test = function (SceneSum, Obgs, Trgs) {
                return this.On.toString() == "true";
            };
            return class_4;
        }(OnEvents.BaseEvent));
        OnEvents.OnСlick = /** @class */ (function (_super) {
            __extends(class_5, _super);
            function class_5(ids) {
                var _this = _super.call(this) || this;
                _this.Ids = ids;
                return _this;
            }
            class_5.prototype.Test = function (SceneSum, Obgs, Trgs) {
                var _this = this;
                var rt = false;
                Obgs.filter(function (e) { return _this.Ids.includes(e.Id); }).forEach(function (t) {
                    if (t.ReadClick())
                        rt = true;
                });
                return rt;
            };
            return class_5;
        }(OnEvents.BaseEvent));
        return OnEvents;
    }());
    Interactive.OnEvents = OnEvents;
})(Interactive || (Interactive = {}));
var Objects;
(function (Objects_1) {
    var Trigger = /** @class */ (function () {
        function Trigger(Size, x, y, visual, magnetic, id, Idt, dt) {
            this.color = 0x2600ff;
            this.Funcs = {
                getPointOfIntersection: function (startX1, startY1, endX1, endY1, startX2, startY2, endX2, endY2) {
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
                pointInPoly: function (poly, pointX, pointY) {
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
        Trigger.prototype.Draw = function () {
            this.graphics.clear();
            this.VectorArray = [];
            this.VectorArray.push(this.x - this.Size, this.y - this.Size, this.x + this.Size, this.y - this.Size, this.x + this.Size, this.y + this.Size, this.x - this.Size, this.y + this.Size);
            this.graphics.lineStyle(0);
            this.graphics.beginFill(this.color, this.visual ? 0.5 : 0);
            this.graphics.drawPolygon(this.VectorArray);
            this.graphics.endFill();
        };
        Trigger.prototype.Work = function (Objects, Trgs) {
            var _this = this;
            var elementcount = 0;
            var Sum = 0;
            Objects.forEach(function (e) {
                var OnTrigger = _this.Funcs.pointInPoly(_this.VectorArray, e.sprite.x, e.sprite.y);
                if (OnTrigger) {
                    elementcount += 1;
                    switch (_this.IdTypes) {
                        case 0:
                            Sum += _this.TestData.includes(e.GroupType) ? e.Weight : 0;
                            break;
                        case 1:
                            Sum += _this.TestData.includes(e.Id) ? e.Weight : 0;
                            break;
                        case 2:
                            Sum += _this.TestData.includes(e.GroupType + ":" + e.Variant) ? e.Weight : 0;
                            break;
                        case 3:
                            Sum += e.Weight;
                            break;
                        default:
                    }
                }
                if (_this.magnetic) {
                    var OnTrg = (_this.Funcs.pointInPoly(_this.VectorArray, e.sprite.hasposx, e.sprite.hasposy));
                    if (OnTrg) {
                        if (e.sprite.DragClass.Dragging && _this.magnetic) {
                            e.sprite.OnTrigger = true;
                            e.sprite.x = _this.x;
                            e.sprite.y = _this.y;
                        }
                    }
                    else {
                        var OnEnother = false;
                        Trgs.filter(function (x) { return x.magnetic; }).forEach(function (tr) {
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
        };
        return Trigger;
    }());
    Objects_1.Trigger = Trigger;
    var DragableObject = /** @class */ (function () {
        function DragableObject(variants, variant, sx, sy, x, y, r, cc, drag) {
            var _this = this;
            if (cc === void 0) { cc = true; }
            if (drag === void 0) { drag = false; }
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
                .on('pointerdown', function (e) { return _this.onDragStart(e); })
                .on('pointerup', function (e) { return _this.onDragEnd(e); })
                .on('pointerupoutside', function (e) { return _this.onDragEnd(e); })
                .on('pointermove', function (e) { return _this.onDragMove(e); })
                .on('pointerover', function (e) { return _this.onPointerOver(e); })
                .on('pointerout', function (e) { return _this.onPointerOut(e); });
        }
        DragableObject.prototype.onPointerOver = function (event) {
            this.MouseOnThis = true;
        };
        DragableObject.prototype.onPointerOut = function (event) {
            this.MouseOnThis = false;
        };
        DragableObject.prototype.onDragStart = function (event) {
            this.MouseDown = true;
            if (!this.CanMove)
                return;
            this.sprite.data = event.data;
            this.sprite.alpha = 0.5;
            this.Dragging = true;
        };
        DragableObject.prototype.onDragEnd = function (event) {
            this.MouseDown = false;
            this.Clicked = true;
            this.sprite.alpha = 1;
            this.Dragging = false;
            this.sprite.data = null;
        };
        DragableObject.prototype.onDragMove = function (event) {
            if (!this.CanMove)
                return;
            if (this.Dragging) {
                var newPosition = this.sprite.data.getLocalPosition(this.sprite.parent);
                this.sprite.hasposx = newPosition.x;
                this.sprite.hasposy = newPosition.y;
                if (!this.sprite.OnTrigger) {
                    this.sprite.x = newPosition.x;
                    this.sprite.y = newPosition.y;
                }
            }
        };
        DragableObject.prototype.SetVariant = function (variant) {
            if (this.Variant == variant)
                return;
            this.Variant = variant;
            // @ts-ignore */}
            this.sprite.texture = this.texture = PIXI.Texture.from(this.Variants[variant]);
        };
        DragableObject.prototype.SetRotation = function (rotation) {
            if (this.Rotation == rotation)
                return;
            this.Rotation = rotation;
            this.sprite.rotation = Math.PI / 180 * this.Rotation;
        };
        DragableObject.prototype.AddRotation = function (rotation) {
            if (0 == rotation)
                return;
            this.Rotation += rotation;
            this.sprite.rotation = Math.PI / 180 * this.Rotation;
        };
        DragableObject.prototype.SetVisible = function (visible) {
            if (this.Visible == visible)
                return;
            this.Visible = visible;
            this.sprite.visible = this.Visible;
        };
        DragableObject.prototype.SetCanMove = function (canmove) {
            if (this.CanMove == canmove)
                return;
            this.CanMove = canmove;
            this.sprite.CanMove = canmove;
            this.sprite.buttonMode = this.Button || canmove;
        };
        DragableObject.prototype.SetIsButton = function (on) {
            if (this.Button == on)
                return;
            this.Button = on;
            this.sprite.buttonMode = on;
        };
        DragableObject.prototype.ReadClick = function () {
            if (this.Clicked) {
                this.Clicked = false;
                return true;
            }
            return false;
        };
        DragableObject.NullTexture = 'TestItems/Prefabs/Shared/Null.png';
        return DragableObject;
    }());
    Objects_1.DragableObject = DragableObject;
    var ElectronsObjects = /** @class */ (function (_super) {
        __extends(ElectronsObjects, _super);
        function ElectronsObjects(sx, sy, x, y, r, type, isdragable, varitant) {
            return _super.call(this, type.textures, varitant, sx, sy, x, y, r, true, isdragable) || this;
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
        return ElectronsObjects;
    }(DragableObject));
    Objects_1.ElectronsObjects = ElectronsObjects;
    var CustumObject = /** @class */ (function (_super) {
        __extends(CustumObject, _super);
        function CustumObject(sx, sy, x, y, r, type, isdragable, varitant) {
            return _super.call(this, type, varitant, sx, sy, x, y, r, true, isdragable) || this;
        }
        return CustumObject;
    }(DragableObject));
    Objects_1.CustumObject = CustumObject;
    var EatObjects = /** @class */ (function (_super) {
        __extends(EatObjects, _super);
        function EatObjects(sx, sy, x, y, r, type, isdragable, varitant) {
            return _super.call(this, type.textures, varitant, sx, sy, x, y, r, true, isdragable) || this;
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
        return EatObjects;
    }(DragableObject));
    Objects_1.EatObjects = EatObjects;
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        function Label(sx, sy, x, y, r, type, isdragable, varitant) {
            var _this = this;
            // @ts-ignore */}
            var richText = new PIXI.Text(type, Label.Variants[varitant]);
            richText.updateText();
            _this = _super.call(this, richText, 0, sx, sy, x, y, r, true, isdragable) || this;
            return _this;
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
        return Label;
    }(DragableObject));
    Objects_1.Label = Label;
})(Objects || (Objects = {}));
var Services;
(function (Services) {
    var VisualMap = /** @class */ (function () {
        function VisualMap(smap) {
            var _this = this;
            this.Objects = [];
            this.Triggers = [];
            this.Interactive = [];
            smap.Objects.sort(function (x, y) { return x.Position.Z < y.Position.Z ? -1 : 1; });
            smap.Objects.forEach(function (e) {
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
                _this.Objects.push(Obj);
            });
            smap.Triggers.forEach(function (e) { return _this.Triggers.push(new Objects.Trigger(e.Position.Size, e.Position.X, e.Position.Y, e.Visual, e.Magnetic, e.Id, e.IdTypes, e.TestData)); });
            smap.Interactive.forEach(function (e) { return _this.Interactive.push(new Interactive.InteractorWorker(e.Ids, Interactive.OnEvents.Create(e.On), new Interactive.Interactor(e.Interactor))); });
        }
        VisualMap.prototype.Work = function (SceneSum) {
            var _this = this;
            this.Interactive.forEach(function (e) { return e.Work(SceneSum, _this.Objects, _this.Triggers); });
            this.Triggers.forEach(function (e) { return e.Work(_this.Objects, _this.Triggers); });
        };
        return VisualMap;
    }());
    Services.VisualMap = VisualMap;
    var VisualTest = /** @class */ (function () {
        function VisualTest(smap, display) {
            var _this = this;
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
            this.Vmap.Triggers.forEach(function (e) { return _this.VDisplayContainer.addChild(e.graphics); });
            this.Vmap.Objects.forEach(function (e) { return _this.VDisplayContainer.addChild(e.sprite); });
            this.VDisplay.ticker.add(function (delta) { return _this.Worker(delta); });
            this.VDisplay.ticker.add(function (delta) { return _this.Twork.Work(_this.SceneSum); });
            window.addEventListener('resize', function () { _this.resize(_this); });
            this.resize(this);
        }
        VisualTest.prototype.Worker = function (delta) {
            console.log(this.SceneSum);
            this.Vmap.Work(this.SceneSum);
            this.SceneSum = this.Vmap.Triggers.map(function (item) { return item.Sum; }).reduce(function (a, b) { return a + b; }, 0);
        };
        VisualTest.prototype.Pass = function (max) {
            var Result = new SaveData.ResultData(this.Twork.Passed, max, this.Twork.PassRule, this.Twork.Bal);
            return btoa(JSON.stringify(Result));
        };
        VisualTest.prototype.resize = function (t) {
            var TestWidth = document.getElementById("testMain").clientWidth;
            t.VDisplay.renderer.resize(TestWidth, TestWidth / 3 * 2);
            t.VDisplay.stage.scale.set(TestWidth / 900, TestWidth / 900);
        };
        VisualTest.prototype.destroy = function () {
            this.VDisplay.destroy();
            this.VDisplay = undefined;
            this.Vmap = undefined;
            this.resize = undefined;
            this.VDisplayContainer = undefined;
        };
        return VisualTest;
    }());
    Services.VisualTest = VisualTest;
    var TestWorker = /** @class */ (function () {
        function TestWorker(TestS) {
            var _this = this;
            this.Passed = false;
            this.PassRule = TestS.PassRule;
            this.Bal = TestS.Bal;
            this.Work = (function (SceneSum) { return _this.Passed = SceneSum; });
        }
        return TestWorker;
    }());
    Services.TestWorker = TestWorker;
})(Services || (Services = {}));
var VisualTestsWorker = /** @class */ (function () {
    function VisualTestsWorker(Test, MarkdownEng) {
        this.VisualData = {};
        this.EndData = {};
        this.TestData = Test;
        this.NowTestId = 0;
        this.MaxTestId = Test.Maps.length;
        this.MarkdownEngine = MarkdownEng;
    }
    VisualTestsWorker.prototype.LoadLvl = function () {
        if (this.Vtest != null) {
            this.Vtest.destroy();
            this.Vtest = null;
        }
        var LvlNow = this.TestData.Maps[this.NowTestId];
        this.UpdateVisual(LvlNow.Name, this.NowTestId, this.MaxTestId, LvlNow.MaxBal, LvlNow.Smap.TestSettings.PassRule, LvlNow.Cond);
        this.Vtest = new Services.VisualTest(LvlNow.Smap, this.Canvas);
    };
    ;
    VisualTestsWorker.prototype.UpdateVisual = function (Name, id, MaxTestId, MaxBal, PassRule, Conditioten) {
        this.VisualData = {
            Title: "#" + (id + 1).toString() + "/" + MaxTestId.toString() + " " + Name,
            Condition: this.MarkdownEngine.makeHtml(Conditioten),
            MaxBal: MaxBal,
            OcenType: PassRule,
        };
    };
    ;
    VisualTestsWorker.prototype.Pass = function (tz) {
        var passData = tz.Vtest.Pass(tz.TestData.Maps[tz.NowTestId].MaxBal);
        console.log(passData);
        if (++tz.NowTestId >= tz.MaxTestId)
            tz.EndTest();
        else
            tz.LoadLvl();
    };
    ;
    VisualTestsWorker.prototype.EndTest = function () {
        this.Vtest.destroy();
        this.Vtest = null;
        this.EndData = {
            C: true,
        };
        console.log("End");
    };
    VisualTestsWorker.prototype.Start = function (Canvas) {
        this.Canvas = Canvas;
        this.LoadLvl();
    };
    return VisualTestsWorker;
}());
export { VisualTestsWorker };
