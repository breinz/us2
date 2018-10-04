import { FoodState, State } from "../types";
import { game } from "./main";
import Foods from "./Foods";
import Layout from "./Layout";
import app from "../app";

export default class Food extends PIXI.Graphics {

    public id: string;

    private state: FoodState;

    private state_changed: boolean;

    private colors: number[] = [
        0x58C8DE, 0x13DE12, 0xEE3C78, 0x4C5EC2, 0xB157DD, 0xDE56B8, 0xEE4A48, 0x669A8E, 0xFFFF00, 0xFF9104
    ]

    constructor(state: FoodState) {
        super();

        //let g = new PIXI.Graphics();
        this.beginFill(this.colors[Math.floor(Math.random() * (this.colors.length - 1))]);
        this.drawCircle(0, 0, 5);

        //this.texture = game.renderer.generateTexture(g)
        //console.log(this.texture);
        //this.addChild(g);

        //game.foods.addChild(this);

        this.id = state.id;

        this.x = state.x;
        this.y = state.y;
    }

    /**
     * Update
     * @param state The food state
     * @todo Don't update if nothing changed (not as simple as comparing x and y)
     */
    public update(state: FoodState) {
        this.state = state;

        this.state_changed = true;
    }

    /**
     * Tick
     */
    public tick() {
        if (this.state_changed) {
            this.x = Layout.posX(this.state.x);
            this.y = Layout.posY(this.state.y);

            this.state_changed = false;
        }
    }
}