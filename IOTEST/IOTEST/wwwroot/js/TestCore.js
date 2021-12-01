'use strict';
class Resource {
    Url;
    Name;
    Loaded;
    Id;
}
class Trigger {
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
        this.graphics.beginFill(this.color, this.Visual ? 0.5 : 0);
        this.graphics.drawPolygon(this.VectorArray);
        this.graphics.endFill();
    }

    Work(Objects, Triggers) {
        this.ObjectsInside = [];
        for (const e of Objects) {
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
                if (this.Accepted.includes(e.Id)) {
                    this.ObjectsInside.push(e);
                }
            }
        }
        this.Draw();
    }

    color = 0x2600ff;
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
    Recourse;
    constructor(res) {
        this.X = 100;
        this.Y= 100;
        this.ScaleX = 0.1;
        this.ScaleY = 0.1;
        this.Rotation = 0;
        this.Draggable = true;
        this.ButtonMode = true;
        this.Recourse = res;
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
    constructor(resource, object) {
        this.Sprite = new PIXI.Sprite();
        this.SetResource(resource)
        this.MouseOnThis = false;
        this.Visible = true;

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
            .on('pointerup', (e) => this.onDragEnd())
            .on('pointerupoutside', (e) => this.onDragEnd())
            .on('pointermove', (e) => this.onDragMove())
            .on('pointerover', (e) => this.onPointerOver())
            .on('pointerout', (e) => this.onPointerOut());
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
                this.Sprite.x = newPosition.x;
                this.Sprite.y = newPosition.y;
            }
        }
    }

    SetResource(rs) {
        this.Resource = rs;
        this.Sprite.texture = rs.Loaded;
    }

    SetRotation(rotation) {
        if (this.Rotation === rotation) return;
        this.Rotation = rotation;
        this.Sprite.rotation = Math.PI / 180 * this.Rotation;
    }

    AddRotation(rotation) {
        if (rotation === 0) return;
        this.Rotation += rotation;
        this.Sprite.rotation = Math.PI / 180 * this.Rotation;
    }

    SetVisible(visible) {
        if (this.Visible === visible) return;
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
            for (const t of trg)
                for (const s of this.Selector)
                    if (t.Id === s)
                        if (t.ObjectsInside.length > 0)
                            zxc++;
            if(zxc===this.Selector.length) return true;
        }
        if (this.Event === 3) {
            for (const t of objects) {
                for (const s of this.Selector){
                    if (t.Id === s){
                        if(t.MouseDown===true&&!t.MouseClicked){
                            t.MouseClicked = true;
                            return true;
                        }else{
                            if(t.MouseClicked===true&&t.MouseDown===false){
                                t.MouseClicked=false;
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
    Do(objects, res){
        if(this.Event === 0){
            for (const t of objects) {
                for (const s of this.Selector) {
                    if (t.Id === s) {
                        t.AddRotation(this.Value[0]);
                    }
                }
            }            
        }
        if(this.Event === 1){
            for (const t of objects) {
                for (const s of this.Selector) {
                    if (t.Id === s) {
                        const f1 = res.find((x)=>this.Value[0]===x.Id);
                        const f2 = res.find((x)=>this.Value[1]===x.Id);                        
                        if(t.Resource === f1){
                            t.SetResource(f2);
                        }else
                        {
                            t.SetResource(f1);
                        }
                    }
                }
            }
        }
        if(this.Event === 2){
            for (const t of objects) {
                for (const s of this.Selector) {
                    if (t.Id === s) {
                        if(t.Visible === this.Value[0]){
                            t.SetVisible(this.Value[1]);
                        }else
                        {
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

    Activate(objects,res) {
        for (const d of this.EventActions) {
            d.Do(objects,res);
        }        
        console.log(this)
    }

    Work(objects,trg,res) {
        const al = this.Activators.length;
        let ic = 0;
        for (const e of this.Activators)
            if (e.Check(objects,trg))
                ic++;
        if (al === ic) this.Activate(objects,res);
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

    constructor(canvas, testParent, test) {
        this.Resources = test.Resources;
        this.Name = test.Name;
        this.DraggableObjects = test.DraggableObjects;
        this.Triggers = test.Triggers;
        this.Animations = test.Animations;
        this.Canvas = canvas;
        this.Display = new PIXI.Application({
            view: this.Canvas,
            backgroundAlpha: 0,
            antialias: true,
            resolution: 1
        })
        this.TestParent = testParent;

        this.DisplayContainer = new PIXI.Container();
        this.Display.stage.addChild(this.DisplayContainer);

        this.Canvas.style.background = "url('/TestItems/Prefabs/Backgrounds/5.jpg')"
        this.Canvas.style.backgroundRepeat = "round"

        const loader = PIXI.Loader.shared;

        this.Resources.forEach((e) => loader.add(e.Url));
        loader.load((loader, res) => {
            for (const e of this.Resources){
                e.Loaded = res[e.Url].texture;
                e.__proto__ = Resource.prototype;
            } 
            this.texturesLoaded();
        });

        window.addEventListener('resize', () => this.resize(this));
        this.resize(this);

    }
    texturesLoaded() {
        for (let i = 0; i < this.Triggers.length; i++) {
            const obj = this.Triggers[i];
            this.Triggers[i] = new Trigger(obj);
            this.DisplayContainer.addChild(this.Triggers[i].graphics)
            console.log(this.Triggers[i])
        }
        for (let i = 0; i < this.DraggableObjects.length; i++) {
            const obj = this.DraggableObjects[i];
            const res = this.Resources.find(x => x.Id === obj.ResourceId);
            if (res === undefined) continue;
            this.DraggableObjects[i] = new DraggableObject(res, obj);
            this.DisplayContainer.addChild(this.DraggableObjects[i].Sprite)
        }
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
            e.Work(this.DraggableObjects,this.Triggers, this.Resources);
        }

    }
    resize(core) {
        const testWidth = core.TestParent.clientWidth;
        const w = testWidth;
        const h = testWidth / 3 * 2;
        core.Display.renderer.resize(w, h);
        core.Display.stage.scale.set(testWidth / 1000, testWidth / 1000);
    }    
    AddElement(data){
        let maxId = 0;
        for (const t of this.DraggableObjects)
            if (maxId < t.Id)
                maxId = t.Id;
        const res = this.Resources[0];
        data.Id = maxId+1;
        const nob = new DraggableObject(res,data )
        this.DraggableObjects.push(nob);
        this.DisplayContainer.addChild(nob.Sprite)
    }
    AddResource(data){
        const loader = PIXI.Loader.shared;
        data.forEach((e) => loader.add(e.Url));        
        loader.load((loader, res) => {
            for (const e of data){
                e.Loaded = res[e.Url].texture;
                e.__proto__ = Resource.prototype;
                this.Resources.push(e);
            }
        });
    }
    RemoveObject(obj){
        this.DisplayContainer.removeChild(obj.Sprite);        
        this.DraggableObjects =  this.DraggableObjects.filter(x=>x!==obj);      
        
    }
    Request(request, data){
        switch (request) {
            case "add":
                return this.AddElement(data);
            case "resAdd":
                return this.AddResource(data);
            case "getObjects":
                return this.DraggableObjects;
            case "removeObj":
                return this.RemoveObject(data);
                
        }
       
    }

}

