import * as uniqid from "uniqid"
import User from "./User";
import { State, GameState } from "../types";

export default class Game {

    /**
     * Game uuid
     */
    public uuid: string;

    /** 
     * List of players 
     */
    private arUsers: User[];

    /** 
     * Width of the game 
     */
    public width: number;

    /** 
     * Height of the game 
     */
    public height: number;

    constructor() {
        this.uuid = uniqid();

        this.arUsers = [];

        this.width = 10000;
        this.height = 10000;
    }

    /**
     * A new user joins the game
     * @param name The user's name
     * @return The uuid of the user who joined
     */
    public join(name: string): string {
        let user = new User(name, this);
        this.arUsers.push(user)
        return user.uuid;
    }

    /**
     * Does this game host a given player
     * @param uuid The user's uuid
     */
    public hosts(uuid: string): boolean {
        for (let i = 0; i < this.arUsers.length; i++) {
            if (this.arUsers[i].uuid === uuid) return true;
        }
        return false;
    }

    /**
     * The game state
     * @param uuid The user's uuid
     */
    public stateFor(uuid: string): State {
        let user = this.findUser(uuid);

        if (!user) {
            throw `User ${uuid} not found`;
        }

        return {
            game: this.state,
            user: user.state
        }
    }

    /**
     * This game state
     */
    private get state(): GameState {
        return {
            uuid: this.uuid
        }
    }

    /**
     * Find a user in that game
     * @param uuid The user's uuid
     */
    private findUser(uuid: string): User {
        for (let i = 0; i < this.arUsers.length; i++) {
            if (this.arUsers[i].uuid === uuid) return this.arUsers[i];
        }
        return null;
    }
}