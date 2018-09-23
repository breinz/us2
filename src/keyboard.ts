import dispatcher from "./dispatcher";
import { EVENT } from "./helper";

export default class Keyboard {

    /**
     * Key pressed
     */
    private arPressed: number[];

    public left: boolean = false;
    public right: boolean = false;
    public up: boolean = false;
    public down: boolean = false;

    constructor() {
        this.arPressed = [];

        window.addEventListener("keydown", (event) => this.onKeyDown(event))
        window.addEventListener("keyup", (event) => this.onKeyUp(event))
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
    private onKeyDown(event: KeyboardEvent) {
        console.log(event.keyCode);
        if (event.keyCode === 37 || event.keyCode === 81) this.left = true;
        if (event.keyCode === 38 || event.keyCode === 90) this.up = true;
        if (event.keyCode === 39 || event.keyCode === 68) this.right = true;
        if (event.keyCode === 40 || event.keyCode === 83) this.down = true;

        for (let i = 0; i < this.arPressed.length; i++) {
            if (this.arPressed[i] === event.keyCode) return;
        }
        this.arPressed.push(event.keyCode);
        dispatcher.dispatch(EVENT["KEY_DOWN"]);
    }

    /**
     * Key up
     * @param event The keyboard event
     */
    private onKeyUp(event: KeyboardEvent) {
        if (event.keyCode === 37 || event.keyCode === 81) this.left = false;
        if (event.keyCode === 38 || event.keyCode === 90) this.up = false;
        if (event.keyCode === 39 || event.keyCode === 68) this.right = false;
        if (event.keyCode === 40 || event.keyCode === 83) this.down = false;

        for (let i = this.arPressed.length - 1; i >= 0; i--) {
            if (this.arPressed[i] === event.keyCode) {
                this.arPressed.splice(i, 1);
                break;
            }
        }
        dispatcher.dispatch(EVENT["KEY_UP"]);
    }

}