import { UserState, State } from "../types";
import { game } from "./main";
import dispatcher from "../dispatcher";
import { EVENT } from "../helper";
import IDisplayable from "./IDisplayable";
import Layout from "./Layout";

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
     * Flag when the user has been drawn
     */
    private _drawn: boolean;

    /**
     * Has the user been updated. Aka does it still exist on the server
     */
    private updated: boolean;

    private justUpdated: boolean;

    constructor(state: UserState) {
        super();

        this.updateState(state);
    }

    public tick() {
        let redraw: boolean = false;

        /*if (!this.justUpdated) {
            if (this.state.vx !== 0) {
                this.state.x += this.state.vx;
                redraw = true;
            }
            if (this.state.vy !== 0) {
                this.state.y += this.state.vy;
                redraw = true;
            }
        }
        this.justUpdated = false;*/

        //if (redraw) {
        this.draw();
        //}
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
        //this.draw();

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
        this.justUpdated = true;
    }

    /**
     * Draw the user
     */
    private draw() {
        if (!this._drawn) {
            let s = new PIXI.Graphics();
            s.beginFill(game.users.me === this ? 0x0066FF : 0xFF6600);
            s.drawCircle(0, 0, 10);
            this.addChild(s);

            game.container.addChild(this);
        }

        if (this === game.users.me) {
            this.x = this.state.x;// pos.x;
            this.y = this.state.y;// pos.y;
        } else {
            this.x = Layout.posX(this.state.x);
            this.y = Layout.posY(this.state.y);
        }
        //}
        //this.x = this.state.x;
        //this.y = this.state.y;

        this._drawn = true;

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