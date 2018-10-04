import { game } from "./main";

export default class Layout {

    /**
     * Is an item visible from the player
     * @param x X position
     * @param y Y position
     */
    public static isVisible(x: number, y: number): boolean {
        //const me = game.users.me;
        const gameState = game.state.game;

        //const reachX = Math.abs(x - me.x) < window.innerWidth / 2;
        //const reachY = Math.abs(y - me.y) < window.innerHeight / 2;


        if (Layout.reachableX(x)) {
            if (
                Layout.reachableY(y)
                || Layout.reachableY(y + gameState.height)
                || Layout.reachableY(y - gameState.height)
            ) {
                return true;
            }
        }

        if (Layout.reachableY(y)) {
            if (
                Layout.reachableX(x + gameState.width)
                || Layout.reachableX(x - gameState.width)
            ) {
                return true;
            }
        }

        if (
            Layout.reachableX(x + gameState.width) && Layout.reachableY(y + gameState.height) ||
            Layout.reachableX(x + gameState.width) && Layout.reachableY(y - gameState.height) ||
            Layout.reachableX(x - gameState.width) && Layout.reachableY(y + gameState.height) ||
            Layout.reachableX(x - gameState.width) && Layout.reachableY(y - gameState.height)
        ) {
            return true;
        }

        return false;
    }

    public static reachableX(x: number): boolean {
        return Math.abs(x - game.users.me.x) <= window.innerWidth / 2 + 150;
    }

    public static reachableY(y: number): boolean {
        return Math.abs(y - game.users.me.y) <= window.innerHeight / 2 + 150;
    }

    /**
     * Position an item on y
     * @param y Item's original y position
     */
    public static posX(x: number): number {
        if (Math.abs(game.users.me.x - x) <= window.innerWidth / 2) {
            return x;
        }

        if (x < window.innerWidth / 2) { // Does not have to be more precise
            return x + game.state.game.width;
        }

        return x - game.state.game.width;
    }

    /**
     * Position an item on y
     * @param y Item's original y position
     */
    public static posY(y: number): number {
        if (Math.abs(game.users.me.y - y) < window.innerHeight / 2) {
            return y;
        }

        if (y < window.innerHeight / 2) { // Does not have to be more precise
            return y + game.state.game.height;
        }

        return y - game.state.game.height;
    }

}