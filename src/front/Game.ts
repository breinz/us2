import * as PIXI from "pixi.js"
import { State } from "../types";
import Background from "./Background";
import dispatcher from "../dispatcher";
import { SOCKET, EVENT, server_tick_interval, client_tick_interval } from "../helper";
import * as io from "socket.io-client"
import Controls from "./controls";
import Users from "./users";
import IDisplayable from "./IDisplayable";
import { game } from "./main";
import Foods from "./Foods";

export default class Game {

    /**
     * The game id
     */
    public id: string;

    /**
     * The PIXI app
     */
    private app: PIXI.Application;

    public renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    /**
     * Main container
     */
    public container: PIXI.Container;

    /**
     * Game socket
     */
    public socket: SocketIOClient.Socket;

    /** 
     * Controls 
     */
    public controls: Controls;

    /**
     * State
     */
    public state: State;

    /**
     * List of users
     */
    public users: Users;

    /**
     * List of food
     */
    public foods: Foods;

    /**
     * Flag, has the data been initialized
     */
    private initialized: boolean;

    constructor(gid: string, uid: string) {
        this.id = gid;

        this.initPixi();

        /** Initialize the users list */
        this.users = new Users(uid);

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
            //transparent: true,
            antialias: true,
            backgroundColor: 0xEEEEEE
        });

        this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight)

        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);

        // Remove right click
        this.app.view.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });

        // Add to screen
        document.getElementById("game").appendChild(this.app.view)

        // Make it interactive
        this.app.stage.interactive = true;

        //this.app.ticker.add(this.tick);
    }

    /**
     * Receive a game state
     */
    private onStateUpdate = (state: State) => {

        this.state = state;

        // Everything is ready to start the ticker
        if (!this.initialized) {
            // Background
            const bg = new PIXI.Graphics();
            bg.beginFill(0xEEEEEE);
            bg.lineStyle(1, 0);
            bg.drawRect(0, 0, state.game.width, state.game.height);
            this.container.addChild(bg);

            // Foods
            this.foods = new Foods();
            this.container.addChild(this.foods);

            setInterval(this.tick, client_tick_interval);

            this.controls = new Controls();

            console.log(state);
        }

        this.initialized = true;

        // Update the uses
        this.users.update(state);

        // Update the foods
        this.foods.update(state);

        //this.user.onStateUpdate(state);
    }

    private tick = () => {

        this.users.tick();

        this.container.x = -this.users.me.x + window.innerWidth / 2;
        this.container.y = -this.users.me.y + window.innerHeight / 2;

        this.controls.tick();
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