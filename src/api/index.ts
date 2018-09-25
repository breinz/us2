import * as express from "express";
import { gameServer } from "../app";

let router = express.Router();

/**
 * Get the game_id for the logged in user
 */
router.get("/gameId", (req, res) => {
    let gid = gameServer.gameIdFor(req.cookies.user);

    if (!gid) {
        res.clearCookie("user");
        return res.send({ success: false });
    }

    res.send({
        gid: gid,
        uid: req.cookies.user
    });
})

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
});

export default router;