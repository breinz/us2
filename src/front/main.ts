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

async function initGame() {
    const res = await Axios.get("/api/gameId");

    if (res.data.success === false) {
        return window.location.reload();
    }

    game = new Game(res.data.gid, res.data.uid);
}