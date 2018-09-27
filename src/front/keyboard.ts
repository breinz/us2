import dispatcher from "../dispatcher";
import { EVENT, SOCKET } from "../helper";
import { game } from "./main";

export default class Keyboard {

    /**
     * The user's id
     */
    private user_id: string;

    /**
     * The game's id
     */
    private game_id: string;

    /**
     * Key pressed
     */
    private arPressed: number[];

    public left: boolean = false;
    public right: boolean = false;
    public up: boolean = false;
    public down: boolean = false;

    constructor(game_id: string, user_id: string) {
        this.user_id = user_id;
        this.game_id = game_id;

        this.arPressed = [];

        window.addEventListener("keydown", this.onKeyDown)
        window.addEventListener("keyup", this.onKeyUp)
    }

    /**
     * Is a key pressed
     * @param keyCode The key code
     */
    public pressed(keyCode: number): boolean {
        for (let i = 0; i < this.arPressed.length; i++) {
            if (this.arPressed[i] === keyCode) return true;
        }
        return false;
    }

    /**
     * Key down
     * @param event The keyboard event
     */
    private onKeyDown = (event: KeyboardEvent) => {
        if (event.keyCode === 37 || event.keyCode === 81 || event.keyCode === 65) this.left = true;
        if (event.keyCode === 38 || event.keyCode === 90 || event.keyCode === 87) {
            this.up = true;
        }
        if (event.keyCode === 39 || event.keyCode === 68) this.right = true;
        if (event.keyCode === 40 || event.keyCode === 83) this.down = true;

        for (let i = 0; i < this.arPressed.length; i++) {
            if (this.arPressed[i] === event.keyCode) return;
        }
        this.arPressed.push(event.keyCode);

        // Send the key to the server
        game.socket.emit(SOCKET.KEY_DOWN, this.user_id, event.keyCode);

        dispatcher.dispatch(EVENT["KEY_DOWN"]);
        dispatcher.dispatch(EVENT.KEY_PRESSED, event.keyCode)
    }

    /**
     * Key up
     * @param event The keyboard event
     */
    private onKeyUp = (event: KeyboardEvent) => {
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
        game.socket.emit(SOCKET.KEY_UP, this.user_id, event.keyCode);

        dispatcher.dispatch(EVENT["KEY_UP"]);
    }

}