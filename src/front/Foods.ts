import { FoodState, FoodsState, GameState, State } from "../types";
import Food from "./Food";
import { game } from "./main";
import Layout from "./Layout";

export default class Foods extends PIXI.Container {

    /**
     * List of food
     */
    private arFood: Food[];

    /**
     * initialized
     */
    private initialized: boolean;

    private oldState: FoodState[];

    constructor() {
        super();

        this.initialized = false;

        this.arFood = [];
    }

    public update(state: State) {
        let food: Food;
        let foodState: FoodState;

        // Go through every server food
        nextState: for (let i = 0; i < state.food.food.length; i++) {
            foodState = state.food.food[i];

            // Go through every front food
            for (let a = this.arFood.length - 1; a >= 0; a--) {
                food = this.arFood[a];

                // Food is already on stage
                if (food.id == state.food.food[i].id) {

                    if (!Layout.isVisible(foodState.x, foodState.y)) {
                        //if (this.removeTest(foodState, state.game)) {
                        this.arFood.splice(a, 1);
                        this.removeChild(food);
                    } else {
                        food.update(foodState);
                    }
                    continue nextState;
                }

            }

            // Food is not on stage, create it
            //if (this.createTest(state, i)) {
            if (Layout.isVisible(foodState.x, foodState.y)) {
                food = new Food(state.food.food[i]);
                this.addChild(food);
                this.arFood.push(food);
            }
        }

    }

    public tick() {
        for (let i = 0; i < this.arFood.length; i++) {
            this.arFood[i].tick();

        }
    }

    /**
     * Should we remove this item
     * @param foodState Food state
     * @param gameState Game state
     */
    private removeTest(foodState: FoodState, gameState: GameState): boolean {

        const me = game.users.me;

        if (me.x < window.innerWidth / 2) {
            if (foodState.x > gameState.width - (window.innerWidth - me.x)) {
                return false;
            }
        }

        if (Math.abs(foodState.x - me.x) > window.innerWidth / 2) {
            return true;
        }

        if (Math.abs(foodState.y - me.y) > window.innerHeight / 2) {
            return true;
        }

        return false;
    }

    private createTest(state: State, index: number): boolean {
        const foodState = state.food.food[index];
        const me = game.users.me;

        // x < 0
        if (me.x < window.innerWidth / 2) {
            if (foodState.x > state.game.width - game.container.x) {// state.game.width - (window.innerWidth / 2 - me.x)) {
                return true;
            }
        }
        // x > width
        if (me.x > state.game.width - window.innerWidth / 2) {
            if (foodState.x < window.innerWidth - (state.game.width + game.container.x)) {
                return true;
            }
        }

        if (Math.abs(foodState.x - me.x) < window.innerWidth / 2 && Math.abs(foodState.y - me.y) < window.innerHeight / 2) {
            return true;
        }
    }

    public remove(child: Food) {
        for (let i = this.arFood.length - 1; i >= 0; i--) {
            if (this.arFood[i] === child) {
                //this.arFood.splice(i, 1);
                this.removeChild(child);
            }
        }
    }
}