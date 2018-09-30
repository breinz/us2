import { FoodState } from "../types";
import { game } from "./main";

export default class Food extends PIXI.Graphics {

    private colors: number[] = [
        0xFF0000, 0x00FF00, 0x0000FF,
        0xFFFF00, 0xFF00FF, 0x00FFFF
    ]

    constructor() {
        super();

        this.beginFill(this.colors[Math.floor(Math.random() * (this.colors.length - 1))]);
        this.drawCircle(0, 0, 5);

        game.container.addChild(this);
    }

    public update(state: FoodState) {
        this.x = state.x;
        this.y = state.y;
    }
}