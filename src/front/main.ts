import Game from "./Game";
import Axios from "axios";

/**
 * The front game
 */
export let game: Game;

// Initialize the game
if (document.getElementById("game")) {
    initGame();
}

/**
 * Initialize the game
 */
async function initGame() {
    // Get the game id
    const res = await Axios.get("/api/gameId");

    // Something went wrong. reload the page to go to login
    if (res.data.success === false) {
        return window.location.reload();
    }

    // Start the game
    game = new Game(res.data.gid, res.data.uid);
}