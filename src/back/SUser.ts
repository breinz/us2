import * as uniqid from "uniqid";
import { UserState } from "../types";
import SGame from "./SGame";
import Keyboard from "../front/keyboard";
import { keyboard, D2R, EVENT } from "../helper";
import dispatcher from "../dispatcher";
import { gameServer } from "../app";

export default class SUser {

    /** The unique user's id */
    public uuid: string;

    /** The game thus user's in */
    private game: SGame;

    /** The user's name */
    public name: string;

    /**
     * Speed
     */
    private speed: number = 2;

    /** Is the user moving to the left */
    private moveLeft: boolean = false;
    /** Is the user moving to the right */
    private moveRight: boolean = false;
    /** Is the user moving up */
    private moveUp: boolean = false;
    /** Is the user moving down */
    private moveDown: boolean = false;

    /**
     * Position x
     */
    private x: number;
    /**
     * Position y
     */
    private y: number;

    constructor(name: string, game: SGame) {
        this.game = game;

        this.name = name;
        this.uuid = uniqid();

        // Position the user randomly
        this.x = Math.round(Math.random() * this.game.width);
        this.y = Math.round(Math.random() * this.game.height);
    }

    /**
     * x velocity
     */
    private get vx(): number {
        if (!this.moveLeft && !this.moveRight) return 0;
        if (this.moveLeft && this.moveRight) return 0;

        const direction = this.moveLeft ? -1 : 1;

        if (this.moveUp || this.moveDown) {
            return Math.cos(D2R * 45) * this.speed * direction;
        }

        return this.speed * direction;
    }

    /**
     * y velocity
     */
    private get vy(): number {
        if (!this.moveUp && !this.moveDown) return 0;
        if (this.moveUp && this.moveDown) return 0;

        const direction = this.moveUp ? -1 : 1;

        if (this.moveRight || this.moveLeft) {
            return Math.sin(D2R * 45) * this.speed * direction;
        }

        return this.speed * direction;
    }

    /**
     * Ticker
     */
    public tick() {
        if (this.moveUp === true) {
            this.y--;
        }
        if (this.moveLeft === true) {
            this.x--;
        }
    }

    /**
     * The user's state
     */
    public get state(): UserState {
        return {
            name: this.name,
            uuid: this.uuid,
            x: this.x,
            y: this.y,
            vx: this.vx,
            vy: this.vy
        };
    }

    /**
     * Move
     * @param key The key 
     * @param pressed Is the key pressed (true) or released (false)
     */
    public onMove(key: number, pressed: boolean) {
        if (keyboard.isUp(key)) {
            this.moveUp = pressed;
        }
        if (keyboard.isLeft(key)) {
            this.moveLeft = pressed;
        }

        this.game.pushState();
    }
}