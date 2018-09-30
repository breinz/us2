import SGame from "./SGame";
import { round } from "../helper";
import { FoodState } from "../types";

export default class SFood {

    /**
     * X position
     */
    private x: number;

    /**
     * Y position
     */
    private y: number;

    /**
     * The game
     */
    private game: SGame;

    constructor(game: SGame) {
        this.game = game;

        //this.x = round((Math.random() * (game.width - 100)) + 50);
        //this.y = round((Math.random() * (game.height - 100)) + 50);

        this.x = round((Math.random() * (game.width)));
        this.y = round((Math.random() * (game.height)));
    }

    /**
     * getState
     */
    public getState(): FoodState {
        return {
            x: this.x,
            y: this.y
        }
    }
}