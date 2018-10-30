import * as uniqid from "uniqid";
import { UserState } from "../types";
import SGame from "./SGame";
import { round, R2D } from "../helper";
import SIWeapon from "./weapon/SIWeapon";
import SBaseWeapon from "./weapon/SBaseWeapon";

export default class SUser {

    private static levels: number[] = [30, 50, 80, 130, 210, 340, 550];
    private level: number;

    /** The unique user's id */
    public uuid: string;

    /** The game this user's in */
    private game: SGame;

    /** The user's name */
    public name: string;

    /**
     * Speed
     */
    private speed: number = 2;

    /**
     * Position x
     */
    public x: number;
    /**
     * Position y
     */
    public y: number;

    /**
     * food
     */
    private food: number;

    /**
     * The score
     */
    private score: number = 0;

    private vx: number;

    private vy: number;

    /** 
     * List of weapons 
     */
    public weaponList: SIWeapon[];

    constructor(name: string, game: SGame) {
        this.game = game;

        this.name = name;
        this.uuid = uniqid();

        // Position the user randomly
        this.x = Math.round(Math.random() * this.game.width);
        this.y = Math.round(Math.random() * this.game.height);

        this.vx = 0;
        this.vy = 0;

        this.level = 0;
        this.food = 0;

        // Initialize with the base weapon
        this.weaponList = [new SBaseWeapon(game)];
    }

    /**
     * Ticker
     */
    public tick() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
            this.x = this.game.width + this.x;
        }
        if (this.y < 0) {
            this.y = this.game.height + this.y;
        }

        if (this.x > this.game.width) {
            this.x = this.x - this.game.width;
        }
        if (this.y > this.game.height) {
            this.y = this.y - this.game.height;
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
            vy: this.vy,
            food: this.food,
            level: this.level,
            nextLevel: SUser.levels[this.level],
            score: this.score
        };
    }

    /**
     * Eat one food
     */
    public eatFood() {
        this.food++;

        this.score += round(Math.random() * 3 + 6);

        this.game.scoreChanged();

        if (this.food > SUser.levels[this.level]) {
            this.level++;
            this.food = 0;
            console.log("NEW LEVEL");
        }
    }

    /**
     * Mouse move
     * @param angle Angle between the mouse and the user
     */
    public onMouseMove(angle: number) {
        this.vx = round(Math.cos(angle) * this.speed, 2);
        this.vy = round(Math.sin(angle) * this.speed, 2);
    }

    /**
    * Mouse click
    * @param angle Angle between the mouse and the user
    */
    public onMouseClick(angle: number) {
        this.fire(angle);
    }

    /**
     * Fire
     * @param angle Angle between the user and the target
     */
    private fire(angle: number) {
        for (let i = 0; i < this.weaponList.length; i++) {
            this.weaponList[i].fire(this, angle);
        }
    }
}