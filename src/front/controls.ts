import dispatcher from "../dispatcher";
import { EVENT, SOCKET, keyboard, round } from "../helper";
import { game } from "./main";

export default class Controls {

    /**
     * Flag to send the mouse pos
     */
    private mouseChanged: boolean = false;

    /**
     * Key pressed
     */
    private arPressed: number[];

    //public left: boolean = false;
    //public right: boolean = false;
    //public up: boolean = false;
    //public down: boolean = false;

    /**
     * Angle in radians between the mouse and the screen center (user)
     */
    private angle: number;

    /**
     * If it's a long click
     */
    private isLongClick: boolean;

    /**
     * The timer to create a long click
     */
    private longClick_timer: NodeJS.Timer;

    /**
     * The time (in milliseconds) to wait to create a long click
     */
    public longClick_delay: number;

    /**
     * Angle between the mouse and the user
     */
    /*public get angle(): number {
        return round(Math.atan2(this.mousePos.y, this.mousePos.x), 2)
    }*/

    constructor() {
        this.arPressed = [];

        this.longClick_delay = 500;

        //window.addEventListener("keydown", this.onKeyDown)
        //window.addEventListener("keyup", this.onKeyUp)
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("mousedown", this.onMouseDown);
        window.addEventListener("mouseup", this.onMouseUp);
    }

    /**
     * Tick
     */
    public tick() {
        if (this.mouseChanged) {
            game.socket.emit(SOCKET.MOUSE_MOVE, game.users.me.id, this.angle);
            this.mouseChanged = false;
        }
    }

    /**
     * Is a key pressed
     * @param keyCode The key code
     */
    /*public pressed(keyCode: number): boolean {
        for (let i = 0; i < this.arPressed.length; i++) {
            if (this.arPressed[i] === keyCode) return true;
        }
        return false;
    }*/

    /**
     * Key down
     * @param event The keyboard event
     */
    /*private onKeyDown = (event: KeyboardEvent) => {

        // If this key is already currently pressed, do nothing
        for (let i = 0; i < this.arPressed.length; i++) {
            if (this.arPressed[i] === event.keyCode) return;
        }

        // Save that key
        this.arPressed.push(event.keyCode);

        if (keyboard.isUp(event.keyCode)) this.up = true;
        if (keyboard.isLeft(event.keyCode)) this.left = true;
        if (keyboard.isDown(event.keyCode)) this.down = true;
        if (keyboard.isRight(event.keyCode)) this.right = true;

        // Send the key to the server
        game.socket.emit(SOCKET.KEY_DOWN, game.users.me.id, event.keyCode);

        //dispatcher.dispatch(EVENT.KEY_DOWN);
        //dispatcher.dispatch(EVENT.KEY_PRESSED, event.keyCode)
    }*/

    /**
     * Key up
     * @param event The keyboard event
     */
    /*private onKeyUp = (event: KeyboardEvent) => {
        if (event.keyCode === 37 || event.keyCode === 81 || event.keyCode === 65) this.left = false;
        if (event.keyCode === 38 || event.keyCode === 90 || event.keyCode === 87) this.up = false;
        if (event.keyCode === 39 || event.keyCode === 68) this.right = false;
        if (event.keyCode === 40 || event.keyCode === 83) this.down = false;

        for (let i = this.arPressed.length - 1; i >= 0; i--) {
            if (this.arPressed[i] === event.keyCode) {
                this.arPressed.splice(i, 1);
                break;
            }
        }

        // Send the key to the server
        game.socket.emit(SOCKET.KEY_UP, game.users.me.id, event.keyCode);

        //dispatcher.dispatch(EVENT["KEY_UP"]);
    }*/

    /**
     * MouseMove
     * @param event Mouse event
     */
    private onMouseMove = (event: MouseEvent) => {
        const me = game.container.toGlobal(game.users.me.position)
        this.angle = round(
            Math.atan2(
                event.offsetY - me.y,
                event.offsetX - me.x
            )
            , 2);
        this.mouseChanged = true;
    }

    /**
     * MouseDown
     * @param event Mouse event
     */
    private onMouseDown = (event: MouseEvent) => {

        this.isLongClick = false;

        this.longClick_timer = setTimeout(() => {
            this.isLongClick = true;
        }, this.longClick_delay);
    }

    /**
     * Mouse uo
     * @param event Mouse event
     */
    private onMouseUp = (event: MouseEvent) => {
        clearTimeout(this.longClick_timer);

        if (this.isLongClick) {
            console.log("long click");
        } else {
            console.log("click");
            game.socket.emit(SOCKET.MOUSE_CLICK, game.users.me.id, this.angle);
        }

        this.isLongClick = false;
    }

}