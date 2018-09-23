
import { game } from "../main";

export default class Star extends PIXI.Sprite {

    private shape: PIXI.Graphics;

    constructor() {
        super()

        this.shape = new PIXI.Graphics();
        this.shape.lineStyle(1, 0x000000, .5).moveTo(0, -10).lineTo(0, 10).moveTo(-10, 0).lineTo(10, 0);
        this.addChild(this.shape);
    }


    public destroy() {
        //game.app.stage.removeChild(this);
        super.destroy()
    }
}