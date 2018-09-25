import * as PIXI from "pixi.js"
import Axios from "axios"
import { State } from "../types";
import Background from "./Background";
import dispatcher from "../dispatcher";
import { between, SOCKET, EVENT } from "../helper";
import * as io from "socket.io-client"
import { game } from "./main";
import Keyboard from "./keyboard";
import User from "./User";

export default class Game {

    /**
     * The PIXI app
     */
    public app: PIXI.Application;

    /**
     * Main socket
     */
    private socket: SocketIOClient.Socket;

    /**
     * Game socket
     */
    public game_socket: SocketIOClient.Socket;

    /** 
     * Keyboard 
     */
    public key: Keyboard;

    /** 
     * The player 
     */
    private user: User;

    constructor() {
        this.init();
    }

    /**
     * Initialize the game with data from the server
     */
    private async init() {
        const res = await Axios.get("/api/game");

        // Something went wrong (the cookie has been deleted) refresh to go back to login page
        if (res.data.success === false) {
            return window.location.reload();
        }

        const data: State = res.data;

        console.log(data);

        // Open a connection to the socket
        this.socket = io();
        this.socket.emit(SOCKET.INIT_NSP, data.game.uuid, () => {
            this.game_socket = io(`/${data.game.uuid}`);


            this.draw(data);

            this.key = new Keyboard(data.game.uuid, data.user.uuid);

            // Initialize the user
            this.user = new User(data.user);
        });


    }

    /**
     * Draw the game
     */
    private draw(data: State) {

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

        this.drawBackground()
    }

    /**
     * Draw the background
     */
    private drawBackground() {
        let bg = new Background();
    }

    /**
     * Window resize : keep the app fullscreen
     */
    private onResizeWindow() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        // Dispatch the event
        dispatcher.dispatch(EVENT["RESIZE"], window.innerWidth, window.innerHeight);
    }
}