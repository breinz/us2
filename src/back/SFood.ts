import SGame from "./SGame";
import { round } from "../helper";
import { FoodState } from "../types";
import * as uniqid from "uniqid"

export default class SFood {

    /**
     * Id
     */
    private id: string;

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

        this.id = uniqid();

        this.position();

    }

    private position() {
        this.x = round((Math.random() * (this.game.width - 20)) + 10);
        this.y = round((Math.random() * (this.game.height - 20)) + 10);

    }

    /**
     * getState
     */
    public getState(): FoodState {
        return {
            id: this.id,
            x: this.x,
            y: this.y
        }
    }

    public tick() {
        for (let i = 0; i < this.game.arUsers.length; i++) {
            if (Math.abs(this.game.arUsers[i].x - this.x) < 10 && Math.abs(this.game.arUsers[i].y - this.y) < 10) {
                this.position();

                /** @todo Give the user some points */
            }

        }
    }
}