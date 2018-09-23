import * as uniqid from "uniqid";
import { UserState } from "../types";
import Game from "./Game";

export default class User {

    /** The unique user's id */
    public uuid: string;

    /** The game thus user's in */
    private game: Game;

    /** The user's name */
    public name: string;

    private x: number;
    private y: number;

    constructor(name: string, game: Game) {
        this.game = game;

        this.name = name;
        this.uuid = uniqid();

        // Position the user randomly
        this.x = Math.round(Math.random() * this.game.width);
        this.y = Math.round(Math.random() * this.game.height);
    }

    /**
     * The user's state
     */
    public get state(): UserState {
        return {
            name: this.name,
            uuid: this.uuid,
            x: this.x,
            y: this.y
        };
    }
}