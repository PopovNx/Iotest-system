class DragableObject {
    static NullTexture = 'Prefabs/Shared/Null.png';
    constructor(img, scale, x, y, r, cc = true, drag = false) {
        this.texture = PIXI.Texture.from(img);
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.x = x || 1;
        this.sprite.y = y || 1;
        this.sprite.scale.set(scale || 1);
        this.sprite.anchor.set(cc ? 0.5 : 0);
        this.sprite.interactive = drag;
        this.sprite.buttonMode = drag;
        this.sprite.rotation = Math.PI / 180 * r;
        this.sprite
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    }
    texture;
    sprite;
    onDragStart(event) {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }

    onDragMove() {
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

}
class ElectronsObjects extends DragableObject {
    static Types = {
        Resistor: {
            textures: ['TestItems/Prefabs/Electrons/Resistor.png']
        },
        Led: {
            textures: ['TestItems/Prefabs/Electrons/Led.png']
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
    constructor(scale, x, y, r, type, isdragable, varitant) {
        var texture = type.textures[varitant];
        if (texture === undefined) texture = DragableObject.NullTexture;


        super(texture, scale, x, y, r, true, isdragable);
        this.type = type;
    }
    type;
}

class Trigger {
    constructor(Size, x, y, visual, magnetic) {
        this.magnetic = magnetic;
        this.x = x;
        this.y = y;
        this.visual = visual;
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
    color = 0x2600ff;
    graphics;
    VectorArray;
    x;
    y;
    Size;
    visual;
    elementcount;
}