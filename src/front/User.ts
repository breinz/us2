import { UserState } from "../types";
import { game } from "./main";
import dispatcher from "../dispatcher";
import { EVENT } from "../helper";

export default class User extends PIXI.Container {

    /**
     * The user's data
     */
    private data: UserState;

    constructor(data: UserState) {
        super();

        this.data = data;

        this.draw();

        dispatcher.on(EVENT["RESIZE"], () => this.onResize());
    }

    /**
     * Draw the user
     */
    private draw() {
        let s = new PIXI.Graphics();
        s.beginFill(0xFFFF00);
        s.drawCircle(0, 0, 10);
        this.addChild(s)

        game.app.stage.addChild(this);

        this.onResize();

    }

    /**
     * Window resize
     */
    private onResize() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
    }
}