import { gameServer } from "../app";
import SGame from "./SGame";
import SFood from "./SFood";
import { FoodState } from "../types";

export default class Sfoods {

    /**
     * List of food
     */
    private arFood: SFood[];

    constructor(game: SGame) {
        this.arFood = [];

        let food: SFood;
        for (let i = 0; i < game.width / 10; i++) {
            this.arFood.push(new SFood(game));
        }
    }

    public tick() {

    }

    public getState(): FoodState[] {
        let state: FoodState[] = [];
        for (let i = 0; i < this.arFood.length; i++) {
            state.push(this.arFood[i].getState());
        }
        return state;
    }
}