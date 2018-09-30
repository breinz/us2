import { FoodState } from "../types";
import Food from "./Food";

export default class Foods {

    /**
     * List of food
     */
    private arFood: Food[];

    /**
     * initialized
     */
    private initialized: boolean;

    constructor() {
        this.initialized = false;

        this.arFood = [];
    }

    public update(state: FoodState[]) {
        for (let i = 0; i < state.length; i++) {
            if (!this.initialized) {
                this.arFood.push(new Food());
            }
            this.arFood[i].update(state[i]);
        }
        this.initialized = true;
    }
}