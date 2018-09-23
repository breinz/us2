import User from "./User";
import { GameState } from "../types";

export default class Game {

    /** List of players */
    private arUsers: User[];

    constructor() {
        this.arUsers = [];
    }

    /**
     * A new user joins the game
     * @param name The user's name
     * @return The uuid of the user who joined
     */
    public join(name: string): string {
        let user = new User(name);
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
    public stateFor(uuid: string): GameState {
        let user = this.findUser(uuid);

        if (!user) {
            throw `User ${uuid} not found`;
        }

        return {
            user: user.state
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