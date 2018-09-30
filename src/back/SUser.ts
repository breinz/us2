import * as uniqid from "uniqid";
import { UserState } from "../types";
import SGame from "./SGame";
import Controls from "../front/controls";
import { keyboard, D2R, EVENT, round, R2D } from "../helper";
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

    private vx: number;

    private vy: number;

    constructor(name: string, game: SGame) {
        this.game = game;

        this.name = name;
        this.uuid = uniqid();

        // Position the user randomly
        this.x = Math.round(Math.random() * this.game.width);
        this.y = Math.round(Math.random() * this.game.height);

        this.vx = 0;
        this.vy = 0;
    }

    /**
     * x velocity
     */
    /*private get vx(): number {
        if (!this.moveLeft && !this.moveRight) return 0;
        if (this.moveLeft && this.moveRight) return 0;

        const direction = this.moveLeft ? -1 : 1;

        if (this.moveUp || this.moveDown) {
            return Math.cos(D2R * 45) * this.speed * direction;
        }

        return this.speed * direction;
    }*/

    /**
     * y velocity
     */
    /*private get vy(): number {
        if (!this.moveUp && !this.moveDown) return 0;
        if (this.moveUp && this.moveDown) return 0;

        const direction = this.moveUp ? -1 : 1;

        if (this.moveRight || this.moveLeft) {
            return round(Math.sin(D2R * 45) * this.speed * direction, 2);
        }

        return this.speed * direction;
    }*/

    /**
     * Ticker
     */
    public tick() {
        this.x += this.vx;
        this.y += this.vy;
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
        if (keyboard.isLeft(key)) {
            this.moveLeft = pressed;
        }
        if (keyboard.isRight(key)) {
            this.moveRight = pressed;
        }
        if (keyboard.isUp(key)) {
            this.moveUp = pressed;
        }
        if (keyboard.isDown(key)) {
            this.moveDown = pressed;
        }

        this.game.pushState();
    }

    /**
     * Mouse move
     * @param angle Angle between the mouse and the user
     */
    public onMouseMove(angle: number) {
        this.vx = round(Math.cos(angle) * this.speed, 2);
        this.vy = round(Math.sin(angle) * this.speed, 2);

        //console.log(angle * R2D);
        //console.log("mousemove", event.offsetX);
    }
}