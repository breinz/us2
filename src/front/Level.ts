import { State, UserState } from "../types";
import { game } from "./main";
import Users from "./users";

export default class Level extends PIXI.Container {

    /**
     * The bar
     */
    private bar: PIXI.Graphics;

    /**
     * Level number
     */
    private txt: PIXI.Text;

    /**
     * Text background
     */
    private txt_bg: PIXI.Graphics;

    /**
     * Just to compare to the current level
     */
    private level: number;

    constructor() {
        super();

        // bar
        this.bar = new PIXI.Graphics();
        this.addChild(this.bar);

        // txt
        this.txt = new PIXI.Text("1", {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 13,
            fill: 0xFFFFFF
        });
        this.txt.x = -this.txt.width - 5;
        this.txt.y = (15 - this.txt.height) / 2;

        // txt_background
        this.txt_bg = new PIXI.Graphics();
        this.txt_bg.beginFill(0);
        this.txt_bg.lineStyle(2, 0);
        this.txt_bg.drawRect(0, 0, this.txt.width + 10, 15);
        this.txt_bg.x = -this.txt_bg.width;
        this.addChild(this.txt_bg);
        this.addChild(this.txt);

        // border
        let border = new PIXI.Graphics();
        border.lineStyle(2, 0);
        border.drawRect(0, 0, 200, 15);
        this.addChild(border);
    }

    /**
     * 
     * @param state 
     */
    public update(state: State) {
        let userState: UserState;
        for (let i = 0; i < state.u.length; i++) {
            userState = state.u[i];
            if (userState.uuid == game.users.me.id) {
                this.bar.clear();
                this.bar.beginFill(0xFF0000)
                this.bar.drawRect(0, 0, userState.f * 200 / userState.nl, 15);

                if (userState.l !== this.level) {

                    this.txt.text = (userState.l + 1).toString();
                    this.txt.x = -this.txt.width - 5;

                    this.txt_bg.clear();
                    this.txt_bg.beginFill(0);
                    this.txt_bg.lineStyle(2, 0);
                    this.txt_bg.drawRect(0, 0, this.txt.width + 10, 15);
                    this.txt_bg.x = -this.txt_bg.width;

                    this.level = userState.l;
                }
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