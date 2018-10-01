import { FoodState, State } from "../types";
import { game } from "./main";
import Foods from "./Foods";
import Layout from "./Layout";
import app from "../app";

export default class Food extends PIXI.Graphics {

    public id: string;

    private colors: number[] = [
        0xFF0000, 0x00FF00, 0x0000FF,
        0xFFFF00, 0xFF00FF, 0x00FFFF
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

    public update(state: FoodState) {
        //const foodState = state.food.food[index];

        this.x = Layout.posX(state.x);
        this.y = Layout.posY(state.y);
    }
}