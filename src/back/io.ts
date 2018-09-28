import { Server, Socket } from "socket.io";
import { Http2Server } from "http2";
import { SOCKET, EVENT } from "../helper";
import { gameServer } from "../app";
import dispatcher from "../dispatcher";

class Io {

    /**
     * The socket server
     */
    private io: Server;

    /**
     * List of games
     */
    private games: string[];

    public init(server: Http2Server) {
        this.games = [];

        this.io = require("socket.io")(server)
    }

    /**
     * Create a socket for a game
     * @param gameId Game id
     */
    public createGameServer(gameId: string) {
        const game_io = this.io.of(`/${gameId}`);

        game_io.on("connection", (socket) => {

            // A client ask for a state
            socket.on(SOCKET.GET_STATE, (gid) => {
                game_io.emit(SOCKET.STATE_UPDATE, gameServer.gameState(gid))
            });

            // Key down
            socket.on(SOCKET.KEY_DOWN, (uid: string, key: number) => {
                gameServer.onKeyDown(gameId, uid, key);
            });

            // Key up
            socket.on(SOCKET.KEY_UP, (uid: string, key: number) => {
                gameServer.onKeyUp(gameId, uid, key);
            });
        });

        // Push the state to the clients
        dispatcher.on(EVENT.STATE_UPDATE, (gid: string) => {
            if (gid === gameId) {
                game_io.emit(SOCKET.STATE_UPDATE, gameServer.gameState(gid))
            }
        });
    }
}
export default new Io()