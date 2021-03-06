import SGame from "./SGame";
import { State } from "../types";
import { server_tick_interval } from "../helper";

export default class SApp {

    /** List of current available games */
    private arGames: SGame[];

    constructor() {
        this.arGames = [];

        setInterval(this.ticker, server_tick_interval);
        setInterval(this.forcePush, server_tick_interval * 2);
    }

    /**
     * A user joins a game
     * @param name The user's name
     */
    public join(name: string): string {
        const game = this.findGameToJoin();
        return game.join(name);
    }

    /**
     * Get the game id for a given player
     * @param uid user id
     */
    public gameIdFor(uid: string): string {
        let game: SGame = this.findGame(uid);
        if (!game) return null;
        return game.uuid;
    }

    /**
     * Get the game state for a certain user
     * @param uuid The user's id
     */
    /*public stateFor(uuid: string): State {
        const game = this.findGame(uuid);
        if (!game) {
            throw `User ${uuid} found in no games`;
        }
        return game.stateFor(uuid);
    }*/

    /**
     * The state of a game
     * @param gid Game id
     */
    public gameState(gid: string): State {
        for (let i = 0; i < this.arGames.length; i++) {
            if (this.arGames[i].uuid === gid) {
                return this.arGames[i].getState();
            }
        }
        return null;
    }

    /**
     * Find a game where a given user is playing
     * @param uuid The user's uuid
     */
    private findGame(uuid: string): SGame {
        for (let i = 0; i < this.arGames.length; i++) {
            if (this.arGames[i].hosts(uuid)) {
                return this.arGames[i];
            }
        }
        return null;
    }

    /**
     * Find a joinable game
     */
    private findGameToJoin(): SGame {
        if (this.arGames.length === 0) {
            let game = new SGame()
            this.arGames.push(game);
            return game;
        }

        /** @todo Create another game if all are full (define full too) */

        return this.arGames[0]
    }

    /**
     * Main ticker
     */
    private ticker = () => {
        for (let i = 0; i < this.arGames.length; i++) {
            this.arGames[i].tick();
        }
    }

    private forcePush = () => {
        for (let i = 0; i < this.arGames.length; i++) {
            this.arGames[i].forcePush();
        }
    }

    /**
     * A key is pressed
     * @param gid The game's id
     * @param uid The user's id
     * @param key The key code
     */
    /*public onKeyDown(gid: string, uid: string, key: any) {
        for (let i = 0; i < this.arGames.length; i++) {
            if (this.arGames[i].uuid === gid) {
                this.arGames[i].onKeyDown(uid, key);
                return;
            }
        }
    }*/

    /**
     * A key is released
     * @param gid The game's id
     * @param uid The user's id
     * @param key The key code
     */
    /*public onKeyUp(gid: string, uid: string, key: any) {
        for (let i = 0; i < this.arGames.length; i++) {
            if (this.arGames[i].uuid === gid) {
                this.arGames[i].onKeyUp(uid, key);
                return;
            }
        }
    }*/

    /**
     * A user move his mouse
     * @param gid Game id
     * @param uid User id
     * @param angle Angle between the mouse and the user
     */
    public onMouseMove(gid: string, uid: string, angle: number) {
        for (let i = 0; i < this.arGames.length; i++) {
            if (this.arGames[i].uuid === gid) {
                this.arGames[i].onMouseMove(uid, angle);
            }
        }
    }

    /**
     * A user clicks
     * @param gid Game id
     * @param uid User id
     * @param angle Angle between the mouse and the user
     */
    public onMouseClick(gid: string, uid: string, angle: number) {
        for (let i = 0; i < this.arGames.length; i++) {
            if (this.arGames[i].uuid === gid) {
                this.arGames[i].onMouseClick(uid, angle);
            }
        }
    }

}