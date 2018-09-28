import * as PIXI from "pixi.js"
import Axios from "axios"
import { State } from "../types";
import Background from "./Background";
import dispatcher from "../dispatcher";
import { between, SOCKET, EVENT, tick_interval } from "../helper";
import * as io from "socket.io-client"
import { game } from "./main";
import Keyboard from "./keyboard";
import User from "./User";
import Users from "./users";
import IDisplayable from "./IDisplayable";

export default class Game {

    /**
     * The game id
     */
    public id: string;

    /**
     * The PIXI app
     */
    public app: PIXI.Application;

    /**
     * Game socket
     */
    public socket: SocketIOClient.Socket;

    /** 
     * Keyboard 
     */
    public key: Keyboard;

    /**
     * List of users
     */
    public users: Users;

    constructor(gid: string, uid: string) {
        this.id = gid;

        this.initPixi();

        /** Initialize the users list */
        this.users = new Users(uid);

        this.key = new Keyboard(gid, uid);

        // Connect to the socket
        this.socket = io(`/${this.id}`);

        // Listen to the state coming from the server
        this.socket.on(SOCKET.STATE_UPDATE, this.onStateUpdate)

        // Ask for the game state
        this.socket.emit(SOCKET.GET_STATE, this.id);
    }

    /**
     * Position an item relative to the main user
     * @param obj The object to position
     */
    public posFromMe(obj: IDisplayable): { x: number, y: number } {
        /*return {
            x: obj.state.x,
            y: obj.state.y
        }*/
        return {
            x: window.innerWidth / 2 + obj.state.x - this.users.me.state.x,
            y: window.innerHeight / 2 + obj.state.y - this.users.me.state.y
        }
    }

    /**
     * Initialize PIXI
     */
    private initPixi() {
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

        setInterval(this.tick, tick_interval);

        //this.app.ticker.add(this.tick);
    }

    /**
     * Receive a game state
     */
    private onStateUpdate = (state: State) => {
        //console.log(state);

        console.log("receive", Date.now());
        console.log(state);

        // Update the uses
        this.users.update(state);

        //this.user.onStateUpdate(state);
    }

    private tick = () => {
        //console.log(this.app.ticker.FPS);
        this.users.tick();
    }

    /**
     * Initialize the game with data from the server
     */
    /*private async init() {
        const res = await Axios.get("/api/gameId");

        // Something went wrong (the cookie has been deleted) refresh to go back to login page
        if (res.data.success === false) {
            return window.location.reload();
        }

        this.id = res.data.gid;

        // Initialize the user
        this.user = new User(data.user);

        //const data: State = res.data;

        //console.log(data);

        // Open a connection to the socket
        this.socket = io();
        this.socket.emit(SOCKET.INIT_NSP, this.id, () => {
            this.game_socket = io(`/${this.id}`);


            this.draw(data);

            this.key = new Keyboard(data.game.uuid, data.user.uuid);


        });


    }*/

    /**
     * Draw the game
     */
    private draw(data: State) {

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