import { State, UserState } from "../types";
import { game } from "./main";

export default class Level extends PIXI.Container {

    private bar: PIXI.Graphics;

    constructor() {
        super();

        this.bar = new PIXI.Graphics();
        this.addChild(this.bar);

        let bg = new PIXI.Graphics();
        bg.lineStyle(2, 0);
        bg.drawRect(0, 0, 200, 15);
        this.addChild(bg);
    }

    /**
     * 
     * @param state 
     */
    public update(state: State) {
        let userState: UserState;
        for (let i = 0; i < state.users.length; i++) {
            userState = state.users[i];
            if (userState.uuid == game.users.me.id) {
                this.bar.clear();
                this.bar.beginFill(0xFF0000)
                this.bar.drawRect(0, 0, userState.food * 200 / userState.nextLevel, 15);
                break;
            }
        }
    }

    /**
     * On window resize
     */
    public onResizeWindow() {
        this.x = window.innerWidth / 2 - 100;
        this.y = 20;
    }
}