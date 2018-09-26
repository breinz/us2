import { UserState, State } from "../types";
import { game } from "./main";
import dispatcher from "../dispatcher";
import { EVENT } from "../helper";
import IDisplayable from "./IDisplayable";

export default class User extends PIXI.Container implements IDisplayable {

    /**
     * User id
     */
    public id: string;

    /**
     * The state
     */
    public state: UserState;

    /**
     * Has the user been updated. Aka does it still exist on the server
     */
    private updated: boolean;

    constructor(state: UserState) {
        super();

        this.updateState(state);
    }

    /**
     * Before update
     */
    public onBeforeUpdate() {
        this.updated = false;
    }

    /**
     * After update
     */
    public onAfterUpdate() {
        // The user does not exist anymore on the server (disconnect)
        if (!this.updated) {
            this.destroy();
            return;
        }

        // Draw the user
        this.draw();

        /** @todo Check if the user is too far from me => destroy */


    }

    /**
     * Update the user with the latest state
     * @param state The user state
     */
    public updateState(state: UserState) {
        this.id = state.uuid;

        this.state = state;

        this.updated = true;
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

        if (this === game.users.me) {
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
        } else {
            const pos = game.pos(this);
            this.x = pos.x;
            this.y = pos.y;
        }

    }

    /**
     * Window resize
     */
    /*private onResize() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
    }*/

    /**
     * Destroys this user
     */
    public destroy() {
        dispatcher.dispatch(EVENT.DESTROY_USER, this);
        super.destroy();
    }
}