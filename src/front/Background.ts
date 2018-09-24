import { game } from "./main";
import dispatcher from "../dispatcher";
import Star from "./background/Stars";
import { EVENT } from "../helper";

export default class Background {

    /**
     * Background color
     */
    public static COLOR: number = 0xE7E7E7;

    /**
     * The solid background
     */
    private bg: PIXI.Graphics;

    /**
     * List of background stars
     */
    private arStars: Star[];

    /** 
     * Star limits 
     */
    private limit: { right: number, bottom: number } = { right: 0, bottom: 0 };

    constructor() {
        this.bg = new PIXI.Graphics();
        this.bg.beginFill(Background.COLOR).drawRect(0, 0, window.innerWidth, window.innerHeight);

        game.app.stage.addChild(this.bg);

        // Draw stars
        this.arStars = [];
        this.drawStars();

        dispatcher.on(EVENT["RESIZE"], (w: number, h: number) => this.onResize(w, h));

        game.app.ticker.add(() => this.onTick());
    }

    /**
     * Draw stars
     */
    private drawStars() {
        this.destroyStars()

        const w100 = window.innerWidth / 100;
        const h100 = window.innerHeight / 100;

        this.limit.right = (Math.floor(w100) + 1) * 100;
        this.limit.bottom = (Math.floor(h100) + 1) * 100;

        let star: Star;
        for (let i = 0; i < Math.floor(w100) + 1; i++) {
            for (let j = 0; j < Math.floor(h100) + 1; j++) {
                //if (i * 100 + 50 < window.innerWidth && j * 100 + 50 < window.innerHeight) {
                star = new Star();
                game.app.stage.addChild(star);
                star.x = i * 100 + 50;
                star.y = j * 100 + 50;
                this.arStars.push(star);
                //}
            }
        }
    }

    /**
     * Destroy all stars
     */
    private destroyStars() {
        for (let i = 0; i < this.arStars.length; i++) {
            this.arStars[i].destroy();
        }
        this.arStars = [];
    }

    /**
     * Ticker
     */
    private onTick() {
        let star: Star;
        for (let i = 0; i < this.arStars.length; i++) {
            star = this.arStars[i];
            if (game.key.up) star.y += 3;
            if (game.key.down) star.y -= 3;
            if (game.key.right) star.x -= 3;
            if (game.key.left) star.x += 3;

            this.repositionStar(star);
        }
    }

    /**
     * Reposition a star
     * @param star The star
     */
    private repositionStar(star: Star) {
        if (star.x > this.limit.right) {
            star.x = star.x - this.limit.right;
        } else if (star.x < 0) {
            star.x = this.limit.right + star.x;
        } else if (star.y > this.limit.bottom) {
            star.y = star.y - this.limit.bottom;
        } else if (star.y < 0) {
            star.y = this.limit.bottom + star.y;
        }
    }

    /**
     * Window resized
     * @param w Window width
     * @param h Window height
     */
    private onResize(w: number, h: number) {
        this.bg.clear();
        this.bg.beginFill(Background.COLOR).drawRect(0, 0, w, h);

        this.drawStars();
    }
}