import * as express from "express";
import { gameServer } from "../app";

let router = express.Router();

/**
 * Get the game's state
 */
router.get("/game", (req, res) => {
    let state;
    try {
        state = gameServer.stateFor(req.cookies.user);
    } catch (e) {
        res.clearCookie("user");
        res.send({ success: false });
    }

    res.send(state);
})

export default router;