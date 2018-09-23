import * as PIXI from "pixi.js"
import Axios from "axios"

export default class Game {

    public app: PIXI.Application;

    constructor() {
        this.init();
    }

    /**
     * Initialize the game with data from the server
     */
    private async init() {
        const data = await Axios.get("/api/game");

        if (data.data.success === false) {
            return window.location.reload();
        }

        console.log(data.data);

        this.draw()
    }

    /**
     * Draw the game
     */
    private draw() {

        PIXI.utils.skipHello();

        // Create the app
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            antialias: true
        })

        // Remove right click
        this.app.view.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })

        // Add to screen
        document.getElementById("game").appendChild(this.app.view)

        // Make it interactive
        this.app.stage.interactive = true;

        // Listen to window resize
        window.addEventListener("resize", () => this.onResizeWindow())
    }

    /**
     * Window resize : keep the app fullscreen
     */
    private onResizeWindow() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight)
    }
}