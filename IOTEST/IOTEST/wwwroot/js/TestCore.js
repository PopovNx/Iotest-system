'use strict';

class Resource {
    Url;
    Name;
    Loaded;
    Id;

    constructor(name, url, id) {
        this.Url = url;
        this.Name = name;
        this.Id = id;
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
        let cc = true;
        let drag = true;
        
       
        this.MouseOnThis = false;
        this.Visible = true;
        this.Sprite = new PIXI.Sprite();
        this.SetResource(resource)
        this.Sprite.x = object.X;
        this.Sprite.y = object.Y;
  
        
        this.Sprite.scale.set(1);
        this.Sprite.scale.x = object.ScaleX;
        console.log(object.ScaleX)
        this.Sprite.scale.y = object.ScaleY;
        this.Rotation = object.Rotation;
        
        this.Sprite.anchor.set(cc ? 0.5 : 0);

        this.Sprite.interactive = true;
        this.Sprite.buttonMode = drag;

        this.CanMove = drag;
        this.Sprite.rotation = Math.PI / 180 *  this.Rotation;
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

class TestCore {
    Canvas;
    TestParent;

    Display;
    DisplayContainer;

    Resources;
    Name;
    DraggableObjects;

    constructor(canvas, testParent, test) {
        this.Resources = test.Resources;
        this.Name = test.Name;
        this.DraggableObjects = test.DraggableObjects;
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
            for (const e of this.Resources) e.Loaded = res[e.Url].texture;
            this.texturesLoaded()
        });

        window.addEventListener('resize', () => this.resize(this));
        this.resize(this);
    }

    texturesLoaded() {
        console.log(this.DraggableObjects);
        for (let i = 0; i < this.DraggableObjects.length; i++) {
            const obj = this.DraggableObjects[i];
            const res = this.Resources.find(x => x.Id === obj.ResourceId);
            if (res === undefined) continue;
            this.DraggableObjects[i] = new DraggableObject(res, obj);


            this.DisplayContainer.addChild(this.DraggableObjects[i].Sprite)
        }
        console.log(this.DraggableObjects);

    }

    resize(core) {

        const testWidth = core.TestParent.clientWidth;        
        const w = testWidth;
        const h =  testWidth / 3 * 2;
        core.Display.renderer.resize(w ,h );
        core.Display.stage.scale.set(testWidth / 1000, testWidth / 1000);
    }

}

