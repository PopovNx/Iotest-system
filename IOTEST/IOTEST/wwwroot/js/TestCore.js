'use strict';

class Test {
    Name;
    Description;
    Key;
    Created;
    Tests;
    FinalText;
    Tasks;

    constructor(name, description, finalText) {
        this.Name = name;
        this.Description = description;
        this.FinalText = finalText;
    }
}

class Resource {
    Url;
    Name;
    Loaded;
    Id;
}

class Trigger {
    color = 0x00F0F0;
    graphics;
    VectorArray;
    Size;
    Id;
    ObjectsInside;
    Y;
    X;
    Visual;
    Magnetic;
    Accepted;

    constructor(object) {
        this.X = object.X;
        this.Y = object.Y;
        this.Size = object.Size;
        this.Visual = object.Visual;
        this.Magnetic = object.Magnetic;
        this.Id = object.Id;
        this.Accepted = object.Accepted;
        this.VectorArray = [
            this.X - this.Size, this.Y - this.Size,
            this.X + this.Size, this.Y - this.Size,
            this.X + this.Size, this.Y + this.Size,
            this.X - this.Size, this.Y + this.Size];
        this.graphics = new PIXI.Graphics();
    }

    Draw() {
        this.graphics.clear();
        this.VectorArray = [
            this.X - this.Size, this.Y - this.Size,
            this.X + this.Size, this.Y - this.Size,
            this.X + this.Size, this.Y + this.Size,
            this.X - this.Size, this.Y + this.Size];
        this.graphics.lineStyle(0);
        if (this.Hover === true) {
            this.graphics.beginFill(this.color, 0.4);
        } else
            this.graphics.beginFill(this.color, this.Visual ? 0.2 : 0);
        this.graphics.drawPolygon(this.VectorArray);
        this.graphics.endFill();
    }

    Work(Objects) {
        this.ObjectsInside = [];
        for (const e of Objects) {
            if (!e.Triggerable) continue;
            if (this.Magnetic) {
                if (this.pointInPoly(this.VectorArray, e.Sprite.hasposx, e.Sprite.hasposy)) {
                    if (e.Sprite.DragClass.Dragging && this.Magnetic) {
                        e.Sprite.OnTrigger = true;
                        e.Sprite.x = this.X;
                        e.Sprite.y = this.Y;
                    }
                } else {
                    e.Sprite.OnTrigger = this.pointInPoly(this.VectorArray, e.Sprite.hasposx, e.Sprite.hasposy);
                }
            }
            if (this.pointInPoly(this.VectorArray, e.Sprite.x, e.Sprite.y)) {

                if (e.Visible) {
                    this.ObjectsInside.push(e);
                }
            }
        }
        this.Draw();
    }

    getPointOfIntersection(startX1, startY1, endX1, endY1, startX2, startY2, endX2, endY2) {
        const d = (startX1 - endX1) * (endY2 - startY2) - (startY1 - endY1) * (endX2 - startX2);
        const da = (startX1 - startX2) * (endY2 - startY2) - (startY1 - startY2) * (endX2 - startX2);
        const db = (startX1 - endX1) * (startY1 - startY2) - (startY1 - endY1) * (startX1 - startX2);
        const ta = da / d;
        const tb = db / d;

        if (ta >= 0 && ta <= 1 && tb >= 0 && tb <= 1) {
            const dx = startX1 + ta * (endX1 - startX1);
            const dy = startY1 + ta * (endY1 - startY1);
            return [dx, dy];
        }
        return [-100, -100];
    }

    pointInPoly(poly, pointX, pointY) {
        let i, j, c = false;
        const polyCords = [[poly[0], poly[1]], [poly[2], poly[3]], [poly[4], poly[5]], [poly[6], poly[7]]];
        for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++) {
            if ((
                (polyCords[i][1] > pointY) !== (polyCords[j][1] > pointY)) && (pointX < (polyCords[j][0] - polyCords[i][0]) * (pointY - polyCords[i][1]) / (polyCords[j][1] - polyCords[i][1]) + polyCords[i][0])) {
                c = !c;
            }
        }
        return c;
    }
}

class NewObject {
    X;
    Y;
    ScaleX;
    ScaleY;
    Rotation;
    Draggable;
    ButtonMode;
    Resource;
    Triggerable
    Visible;

    constructor(res, text) {
        this.X = 400;
        this.Y = 400;
        this.ScaleX = 0.2;
        this.ScaleY = 0.2;
        this.Rotation = 0;
        this.Draggable = true;
        this.ButtonMode = true;
        this.Resource = res;
        this.Text = null
        this.Triggerable = true;
        this.Visible = true;
        if (text) {
            this.Text = text;
            this.ScaleX = 0.7;
            this.ScaleY = 0.7;
        }

    }
}

class DraggableObject {
    Id;
    Weight;
    Resource;
    Sprite;
    MouseOnThis;
    GroupType;
    Rotation;
    Visible;
    Button;
    CanMove;
    MouseDown;
    Dragging;
    Clicked;
    Type;
    Text;
    Triggerable;

    constructor(resource, object) {
        if (resource === -1) {
            const textStyle = new PIXI.TextStyle({fontFamily: 'Arial', fill: [object.Text.color], fontSize: 120})
            this.Text = new PIXI.Text(object.Text.text, textStyle);
            this.Text.updateText();
            this.Sprite = new PIXI.Sprite(this.Text.texture);
            this.Resource = -1;
        } else {
            this.Sprite = new PIXI.Sprite();
            this.SetResource(resource)
            this.Text = null;
        }
        this.Triggerable = object.Triggerable;
        this.MouseOnThis = false;
        this.SetVisible(object.Visible)
        this.Id = object.Id;
        this.Sprite.x = object.X;
        this.Sprite.y = object.Y;
        this.Sprite.scale.set(1);
        this.Sprite.scale.x = object.ScaleX;
        this.Sprite.scale.y = object.ScaleY;
        this.Rotation = object.Rotation;
        let cc = true;
        this.Sprite.anchor.set(cc ? 0.5 : 0);
        this.Sprite.interactive = true;
        this.Sprite.buttonMode = object.ButtonMode;
        this.CanMove = object.Draggable;
        this.Sprite.rotation = Math.PI / 180 * this.Rotation;
        this.Sprite.DragClass = this;
        this.Sprite.OnTrigger = false;
        this.MouseDown = false;
        this.Clicked = false;
        this.Sprite
            .on('pointerdown', (e) => this.onDragStart(e))
            .on('pointerup', () => this.onDragEnd())
            .on('pointerupoutside', () => this.onDragEnd())
            .on('pointermove', () => this.onDragMove())
            .on('pointerover', () => this.onPointerOver())
            .on('pointerout', () => this.onPointerOut());
    }

    onPointerOver() {
        this.MouseOnThis = true;
    }

    onPointerOut() {
        this.MouseOnThis = false;
    }

    onDragStart(event) {
        this.MouseDown = true;
        if (!this.CanMove) return;
        this.Sprite.data = event.data;
        this.Sprite.alpha = 0.5;
        this.Dragging = true;
    }

    onDragEnd() {
        this.MouseDown = false;
        this.Clicked = true;
        this.Sprite.alpha = 1;
        this.Dragging = false;
        this.Sprite.data = null;
    }

    onDragMove() {

        if (!this.CanMove) return;
        if (this.Dragging) {

            const newPosition = this.Sprite.data.getLocalPosition(this.Sprite.parent);
            this.Sprite.hasposx = newPosition.x;
            this.Sprite.hasposy = newPosition.y;
            if (!this.Sprite.OnTrigger) {
                this.Sprite.x = Math.round(newPosition.x * 10) / 10;
                this.Sprite.y = Math.round(newPosition.y * 10) / 10;
            }
        }
    }

    SetResource(rs) {
        this.Resource = rs;
        this.Sprite.texture = rs.Loaded;
    }

    get RotationVal() {
        const rot = this.Sprite.rotation * 180 / Math.PI;
        this.Rotation = rot;
        return Math.round(rot * 10) / 10;
    }

    set RotationVal(rotation) {
        if (this.Rotation === rotation) return;
        this.Rotation = rotation;
        this.Sprite.rotation = Math.PI / 180 * this.Rotation;
        if (this.RotationVal > 360) this.RotationVal -= 360;
        if (this.RotationVal < 0) this.RotationVal += 360;
    }

    AddRotation(rotation) {
        if (rotation === 0) return;
        this.RotationVal += rotation;
    }

    SetVisible(visible) {
        this.Visible = visible;
        this.Sprite.visible = this.Visible;
    }

    SetCanMove(e) {
        if (this.CanMove === e) return;
        this.CanMove = e;
        this.Sprite.CanMove = e;
        this.Sprite.buttonMode = this.Button || e;
    }

    SetIsButton(on) {
        if (this.Button === on) return;
        this.Button = on;
        this.Sprite.buttonMode = on;
    }

    GetText() {
        if (this.Text === null) return null;
        return {text: this.Text.text, color: this.Text._style.fill[0]}
    }

    SetText(text, color) {
        if (this.Text === null) return null;
        this.Text.text = text;
        this.Text._style.fill[0] = color;

        this.Text.updateText();

    }

    ReadClick() {
        if (this.Clicked) {
            this.Clicked = false;
            return true
        }
        return false
    }
}

class EventActivator {
    Event;
    Selector;

    constructor(object) {
        this.Event = object.Event;
        this.Selector = object.Selector;

    }

    Check(objects, trg) {
        if (this.Event === 0) return true;
        if (this.Event === 1) return false;
        if (this.Event === 2) {
            let zxc = 0;
            if (this.Selector.length === 0) return false;
            for (const t of trg)
                for (const s of this.Selector)
                    if (t.Id === s)
                        if (t.ObjectsInside.length > 0)
                            zxc++;
            if (zxc === this.Selector.length) return true;
        }
        if (this.Event === 3) {
            for (const t of objects) {
                for (const s of this.Selector) {
                    if (t.Id === s) {
                        if (t.MouseDown === true && !t.MouseClicked) {
                            t.MouseClicked = true;
                            return true;
                        } else {
                            if (t.MouseClicked === true && t.MouseDown === false) {
                                t.MouseClicked = false;
                            }
                        }
                    }
                }
            }
        }
    }
}

class EventAction {
    Event;
    Selector;
    Value;

    constructor(object) {
        this.Event = object.Event;
        this.Selector = object.Selector;
        this.Value = object.Value;
    }

    Do(objects, res) {
        if (this.Event === 0) {
            for (const t of objects) {
                for (const s of this.Selector) {
                    if (t.Id === s) {
                        t.AddRotation(this.Value[0]);
                    }
                }
            }
        }
        if (this.Event === 1) {
            for (const t of objects) {
                for (const s of this.Selector) {
                    if (t.Id === s) {
                        const f1 = res.find((x) => this.Value[0] === x.Id);
                        const f2 = res.find((x) => this.Value[1] === x.Id);
                        if (t.Resource === f1) {
                            t.SetResource(f2);
                        } else {
                            t.SetResource(f1);
                        }
                    }
                }
            }
        }
        if (this.Event === 2) {
            for (const t of objects) {
                for (const s of this.Selector) {
                    if (t.Id === s) {
                        if (t.Sprite.visible === this.Value[0]) {
                            t.SetVisible(this.Value[1]);
                        } else {
                            t.SetVisible(this.Value[0]);
                        }
                    }
                }
            }
        }
    }
}

class Animation {
    Activators;
    EventActions;
    static ActivatorsNames = function (id) {
        switch (id) {
            case 0:
                return "Завжди";
            case 1:
                return "Ніколи";
            case 2:
                return "При тригері";
            case 3:
                return "При натиску";
            default:
                return "Не определено";
        }
    }
    static ActionNames = function (id) {
        switch (id) {
            case -1:
                return "Нічого";
            case 0:
                return "Обертання";
            case 1:
                return "Ресурс";
            case 2:
                return "Видимість";
            default:
                return "Не определено";
        }
    }

    constructor(object) {
        this.Activators = []
        this.EventActions = []
        for (const el of object.Activators) {
            this.Activators.push(new EventActivator(el))
        }

        for (const el of object.EventActions) {
            this.EventActions.push(new EventAction(el))
        }

    }

    Activate(objects, res) {
        for (const d of this.EventActions) {
            d.Do(objects, res);
        }
        console.log(this)
    }

    Work(objects, trg, res) {
        const al = this.Activators.length;
        let ic = 0;
        let bool = false;
        for (const e of this.Activators)
            if (e.Check(objects, trg)) {
                ic++;
                bool = true;
            }
        if (al === ic && bool) this.Activate(objects, res);
    }
}

class TestCore {
    Canvas;
    TestParent;
    Display;
    DisplayContainer;
    Resources;
    Name;
    DraggableObjects;
    Triggers;
    Animations;
    Id;
    CorrectState;
    Description;
    LastWidth;
    Loader;
    EditMode;
    constructor(canvas, testParent, test, optimiseLoad, editMode) {
        this.EditMode = editMode;
        this.Id = test.Id;
        this.Resources = test.Resources;
        this.Name = test.Name;
        this.DraggableObjects = test.DraggableObjects;
        this.Triggers = test.Triggers;
        this.Animations = test.Animations;
        this.Canvas = canvas;
        this.CorrectState = test.CorrectState
        this.Description = test.Description;
        this.Display = new PIXI.Application({
            view: this.Canvas,
            backgroundAlpha: 0,
            antialias: true,
            resolution: 1,
        })
        this.TestParent = testParent;
        this.DisplayContainer = new PIXI.Container();
        this.Display.stage.addChild(this.DisplayContainer);
        this.Loader = new PIXI.Loader("", 10);
        for (const e of this.Resources) {
            if (optimiseLoad) {
                if (this.DraggableObjects.some(x => x.ResourceId === e.Id)) {
                    if(!this.Loader.resources[e.Url])
                        this.Loader.add(e.Url);
                } else {
                    e.Useless = true;
                }
            } else {
                if(!this.Loader.resources[e.Url])
                    this.Loader.add(e.Url);
            }

        }
        this.Loader.load((loader, res) => {
            for (const e of this.Resources) {
                if (e.Useless) continue;
                e.Loaded = res[e.Url].texture;
                e.__proto__ = Resource.prototype;
            }
            this.texturesLoaded();
        });
        const resizer = () => {
            if (this.Destroyed === true) return;
            this.resize(this);
        }
        window.addEventListener('resize', resizer);
        setInterval(resizer, 100);
        this.resize(this);
    }

    texturesLoaded() {
        for (let i = 0; i < this.DraggableObjects.length; i++) {
            const obj = this.DraggableObjects[i];
            if (obj.Text === null) {
                const res = this.Resources.find(x => x.Id === obj.ResourceId);
                if (res === undefined) continue;
                this.DraggableObjects[i] = new DraggableObject(res, obj);
            } else {

                this.DraggableObjects[i] = new DraggableObject(-1, obj);
            }

            this.DisplayContainer.addChild(this.DraggableObjects[i].Sprite)
        }
        for (let i = 0; i < this.Triggers.length; i++) {
            const obj = this.Triggers[i];
            this.Triggers[i] = new Trigger(obj);
            this.DisplayContainer.addChild(this.Triggers[i].graphics)
        }
        console.log(this.Animations)
        for (let i = 0; i < this.Animations.length; i++) {
            const obj = this.Animations[i];
            this.Animations[i] = new Animation(obj);
        }
        this.Display.ticker.add(() => this.Worker());

    }
    Worker() {
        for (let i = 0; i < this.Triggers.length; i++) {
            const e = this.Triggers[i];
            e.Work(this.DraggableObjects, this.Triggers);
        }
        for (let i = 0; i < this.Animations.length; i++) {
            const e = this.Animations[i];
            e.Work(this.DraggableObjects, this.Triggers, this.Resources);
        }

    }

    resize(core) {
        const nd = core.TestParent.getBoundingClientRect();
        const testWidth = nd.width;
        if (core.LastWidth === testWidth) return;
        core.LastWidth = testWidth;
        const w = testWidth;
        const h = testWidth / 3 * 2;
        core.Display.renderer.resize(w, h);
        core.Display.stage.scale.set(testWidth / 1000, testWidth / 1000);
    }

    AddElement(data) {
        let maxId = 0;
        for (const t of this.DraggableObjects) {
            if (maxId < t.Id) {
                maxId = t.Id;
            }
        }
        data.Id = maxId + 1;
        const nob = new DraggableObject(data.Resource, data)
        this.DraggableObjects.push(nob);
        this.DisplayContainer.addChild(nob.Sprite)
    }

    AddResource(data) {
        if (this.Resources.some(x=>x.Url ===data.Url)) return;
        this.Resources.push(data);
        if (this.Loader.resources[data.Url]) return;
        this.Loader.add(data.Url);
        this.Loader.load((loader, res) => {
            data.Loaded = res[data.Url].texture;
            data.__proto__ = Resource.prototype;
        });
    }
    RemoveObject(obj) {
        this.DisplayContainer.removeChild(obj.Sprite);
        this.DraggableObjects = this.DraggableObjects.filter(x => x !== obj);
    }

    AddTrigger() {
        let maxId = 0;
        for (const t of this.Triggers)
            if (maxId < t.Id) {
                maxId = t.Id;
            }
        const obj = {
            X: 200,
            Y: 200,
            Size: 100,
            Visual: true,
            Magnetic: true,
            Id: maxId + 1,
            Accepted: [0, 1, 2],
        }
        const trg = new Trigger(obj);
        console.log(trg);
        this.Triggers.push(trg);
        this.DisplayContainer.addChild(trg.graphics)

    }

    RemoveTrigger(trg) {
        console.log(trg);
        this.DisplayContainer.removeChild(trg.graphics);
        this.Triggers = this.Triggers.filter(x => x !== trg);
    }

    SwapElement(x, y) {
        const in1 = this.DisplayContainer.children.indexOf(this.DraggableObjects[x].Sprite)
        const in2 = this.DisplayContainer.children.indexOf(this.DraggableObjects[y].Sprite)
        const tmp = this.DisplayContainer.children[in1];
        this.DisplayContainer.children[in1] = this.DisplayContainer.children[in2];
        this.DisplayContainer.children[in2] = tmp;
        const tmp1 = this.DraggableObjects[x];
        this.DraggableObjects[x] = this.DraggableObjects[y];
        this.DraggableObjects[y] = tmp1;
    }

    UpElementZ(el) {
        const i = this.DraggableObjects.indexOf(el);
        if ((i + 1) < this.DraggableObjects.length) {
            this.SwapElement(i, i + 1);
        }
    }

    DownElementZ(el) {
        const i = this.DraggableObjects.indexOf(el);
        if ((i - 1) >= 0) {
            this.SwapElement(i, i - 1);
        }
    }

    CreateAnimation() {
        const anim = new Animation({Activators: [], EventActions: []});
        this.Animations.push(anim);
        console.log(this.Animations)
    }

    AddActivator(anim) {
        const act = new EventActivator({Event: 1, Selector: []});
        anim.Activators.push(act);
        console.log(anim)
    }

    AddEventAction(anim) {
        const act = new EventAction({Event: 0, Selector: [], Value: [0, 1]});
        anim.EventActions.push(act);
        console.log(anim)
    }

    RemoveAnimation(a) {
        this.Animations = this.Animations.filter(x => x !== a);
    }
    RemoveResource(a){
        this.Resources = this.Resources.filter(x => x !== a);
    }
    Request(request, data) {
        switch (request) {
            case "add":
                return this.AddElement(data);
            case "resAdd":
                return this.AddResource(data);
            case "getObjects":
                return this.DraggableObjects.slice().reverse();
            case "removeObj":
                return this.RemoveObject(data);
            case "trgAdd":
                return this.AddTrigger(data);
            case "destroyTrg":
                return this.RemoveTrigger(data);
            case "upElement":
                return this.UpElementZ(data);
            case "downElement":
                return this.DownElementZ(data);
            case "createAnim":
                return this.CreateAnimation();
            case "destroyAnim":
                return this.RemoveAnimation(data);
            case "addActivator":
                return this.AddActivator(data);
            case "addEventAction":
                return this.AddEventAction(data);
            case "removeRes":
                return this.RemoveResource(data);
            default:
                throw new Error();

        }

    }

    GetState() {
        if (this.Triggers.length < 1) return null;
        return {
            trg: this.Triggers.map(x => x.ObjectsInside.map(y => y.Id))
        };
    }

    Calculate() {
        const correct = this.CorrectState.trg;
        const nowState = this.GetState().trg;
        let mass = 0;
        let now = 0;
        for (const trg of correct)
            mass += trg.length;
        for (let i = 0; i < correct.length; i++) {
            for (const num of nowState[i]) {
                now += correct[i].includes(num);
            }
        }
        return now / mass;
    }

    Destroy() {
        this.Loader.destroy();
        this.Display.stop()
        this.Display.renderer.destroy();
        this.Destroyed = true;

    }

    Save() {
        try {
            const saved = {
                Id: this.Id,
                Name: this.Name,
                Resources: [],
                DraggableObjects: [],
                Triggers: [],
                Animations: [],
                CorrectState: [],
                Description: this.Description,
            }
            saved.CorrectState = this.CorrectState;
            for (const res of this.Resources) {
                const r = {Id: res.Id, Loaded: null, Name: res.Name, Url: res.Url}
                r.__proto__ = Resource.prototype;
                saved.Resources.push(r)
            }
            for (const anim of this.Animations) {

                const r = {Activators: [], EventActions: []}
                for (const a of anim.Activators) {
                    const rx = {Event: a.Event, Selector: a.Selector};
                    r.Activators.push(rx);
                }
                for (const a of anim.EventActions) {
                    const rx = {
                        Event: a.Event,
                        Selector: a.Selector.filter(function (x) {
                            return x !== "";
                        }),
                        Value: a.Value
                    };
                    r.EventActions.push(rx);
                }
                r.__proto__ = Animation.prototype;
                saved.Animations.push(r)
            }
            for (const obj of this.DraggableObjects) {
                const r = {
                    X: obj.Sprite.x, Y: obj.Sprite.y, ScaleX: obj.Sprite.scale.x, ScaleY: obj.Sprite.scale.y,
                    Rotation: obj.Rotation, Draggable: obj.CanMove, ButtonMode: obj.Sprite.buttonMode,
                    ResourceId: obj.Resource.Id, Id: obj.Id,
                    Visible: obj.Sprite.visible,
                    Triggerable: obj.Triggerable,
                    Text: obj.GetText()
                }
                r.__proto__ = DraggableObject.prototype;
                saved.DraggableObjects.push(r)
            }
            for (const trg of this.Triggers) {
                const r = {
                    X: trg.X,
                    Y: trg.Y,
                    Size: trg.Size,
                    Visual: trg.Visual,
                    Magnetic: trg.Magnetic,
                    Id: trg.Id,
                    Accepted: trg.Accepted,
                }
                r.__proto__ = Trigger.prototype;
                saved.Triggers.push(r)
            }
            return saved;
        } catch (e) {
            return null;
        }

    }
}

