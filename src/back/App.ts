import Game from "./Game";
import { State } from "../types";

export default class App {

    /** List of current available games */
    private arGames: Game[];

    constructor() {
        this.arGames = [];
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
     * Get the game state for a certain user
     * @param uuid The user's id
     */
    public stateFor(uuid: string): State {
        const game = this.findGame(uuid);
        if (!game) {
            throw `User ${uuid} found in no games`;
        }
        return game.stateFor(uuid);
    }

    /**
     * Find a game where a given user is playing
     * @param uuid The user's uuid
     */
    private findGame(uuid: string): Game {
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
    private findGameToJoin(): Game {
        if (this.arGames.length === 0) {
            let game = new Game()
            this.arGames.push(game);
            return game;
        }
        /** @todo Create another game if all are full (define full too) */
        return this.arGames[0]
    }

    /**
     * A key is pressed
     * @param key The key code
     */
    public onKeyDown(key: any) {
        console.log("onKeyDown", key);
    }

}