import Game from "./Game";

/**
 * The front game
 */
export let game: Game;

// Initialize the game
if (document.getElementById("game")) {
    game = new Game();
}