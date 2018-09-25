import * as uniqid from "uniqid"
import SUser from "./SUser";
import { State, GameState, UserState } from "../types";
import Keyboard from "../front/keyboard";
import { keyboard } from "../helper";

export default class SGame {

    /**
     * Game uuid
     */
    public uuid: string;

    /** 
     * List of players 
     */
    private arUsers: SUser[];

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
     * Ticker
     */
    public tick() {
        for (let i = 0; i < this.arUsers.length; i++) {
            this.arUsers[i].tick();
        }
    }

    /**
     * A new user joins the game
     * @param name The user's name
     * @return The uuid of the user who joined
     */
    public join(name: string): string {
        let user = new SUser(name, this);
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
            user: user.state,
            users: this.usersState()
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
     * State of all users
     */
    private usersState(): UserState[] {
        let user: SUser;
        let state: UserState[] = [];
        for (let i = 0; i < this.arUsers.length; i++) {
            state.push(this.arUsers[i].state);
        }
        return state;
    }

    /**
     * Find a user in that game
     * @param uuid The user's uuid
     */
    private findUser(uuid: string): SUser {
        for (let i = 0; i < this.arUsers.length; i++) {
            if (this.arUsers[i].uuid === uuid) return this.arUsers[i];
        }
        return null;
    }

    /**
     * Key down
     * @param uid The user's id
     * @param key The key code
     */
    public onKeyDown(uid: string, key: number) {
        if (keyboard.isMove(key)) {
            for (let i = 0; i < this.arUsers.length; i++) {
                if (this.arUsers[i].uuid === uid) {
                    this.arUsers[i].onMove(key, true);
                }
            }
        }
    }

    /**
     * Key up
     * @param uid The user's id
     * @param key The key code
     */
    public onKeyUp(uid: string, key: number) {
        if (keyboard.isMove(key)) {
            for (let i = 0; i < this.arUsers.length; i++) {
                if (this.arUsers[i].uuid === uid) {
                    this.arUsers[i].onMove(key, false);
                }
            }
        }
    }
}