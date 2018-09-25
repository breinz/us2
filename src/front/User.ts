import { UserState, State } from "../types";
import { game } from "./main";
import dispatcher from "../dispatcher";
import { EVENT } from "../helper";

export default class User extends PIXI.Container {

    /**
     * User id
     */
    private id: string;

    /**
     * The user's data
     */
    private data: UserState;

    /**
     * The position
     */
    private state: UserState;

    constructor(id: string) {
        super();

        //this.data = data;

        this.id = id;

        /*this.draw();

        dispatcher.on(EVENT["RESIZE"], () => this.onResize());*/
    }

    /**
     * Got a state from the server
     * @param state The state
     */
    public onStateUpdate(state: State) {
        for (let i = 0; i < state.users.length; i++) {
            if (state.users[i].uuid === this.id) {
                this.state = state.users[i];
                return;
            }
        }
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