import { gameServer } from "../app";
import SGame from "./SGame";
import SFood from "./SFood";
import { FoodState, FoodsState } from "../types";
import * as uniqid from "uniqid"

export default class Sfoods {

    /**
     * List of food
     */
    private arFood: SFood[];

    /**
     * Flag to check if something has changed in the food list
     */
    private id: string;

    /**
     * Flag : something has changed in the food list
     */
    private changed: boolean;

    constructor(game: SGame) {
        this.arFood = [];

        this.id = uniqid();
        this.changed = false;

        // Initialize the game with so many food
        let food: SFood;
        let howMany = game.width / 20;
        for (let i = 0; i < howMany; i++) {
            this.arFood.push(new SFood(game));
        }
    }

    /**
     * Tick
     */
    public tick() {

        for (let i = 0; i < this.arFood.length; i++) {
            this.arFood[i].tick();
        }
    }

    /**
     * Get the state of foods
     */
    public getState(): FoodsState {
        let state: FoodState[] = [];
        for (let i = 0; i < this.arFood.length; i++) {
            state.push(this.arFood[i].getState());
        }
        return {
            id: this.id,
            f: state
        }
    }
}