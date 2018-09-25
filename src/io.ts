import { Server, Socket } from "socket.io";
import { Http2Server } from "http2";
import { SOCKET, EVENT } from "./helper";
import { gameServer } from "./app";
import dispatcher from "./dispatcher";
//import message from "./SocketMessages"
//import { Us } from "./us";

class Io {

    private io: Server;

    /**
     * Main socket to /
     */
    //private socket: Socket;

    /**
     * List of games
     */
    private games: string[];

    public init(server: Http2Server) {
        this.games = [];

        this.io = require("socket.io")(server)

        /*this.io.on("connection", (socket: Socket) => {

            // Initialize a namespace
            socket.on(SOCKET.INIT_NSP, this.initNsp);

            socket.on("disconnect", (reason) => {
                //console.log("client disconnect", reason);
            })
        });

        dispatcher.on(EVENT.STATE_UPDATE, this.onStateUpdate);*/
    }

    public createGameServer(gid: string) {
        this.io.of(`/${gid}`).on("connection", (socket) => {

            // A client ask for a state
            socket.on(SOCKET.GET_STATE, (gid) => {
                socket.emit(SOCKET.STATE_UPDATE, gameServer.gameState(gid))
            })
        })
    }

    /**
     * Initialize a game namespace
     * @param game_id The game id
     * @param ack Acknowledgement function (callback)
     */
    private initNsp = (game_id: string, ack: () => void) => {
        // Check if that cell is already listening for connections
        for (let index = 0; index < this.games.length; index++) {
            if (this.games[index] === game_id) {
                return ack();
            }
        }

        // --------------------------------------------------
        // Allow connections to that game
        // --------------------------------------------------

        this.io.of(`/${game_id}`).on("connection", (gameSocket: Socket) => {

            const socket = this.io.of(`/${game_id}`);

            gameSocket.on(SOCKET.KEY_DOWN, (gid: string, uid: string, key: number) => {
                gameServer.onKeyDown(gid, uid, key);
            });

            gameSocket.on(SOCKET.KEY_UP, (gid: string, uid: string, key: number) => {
                gameServer.onKeyUp(gid, uid, key);
            });

        });

        this.games.push(game_id);

        ack();
    }

    /**
     * A game state changed and need to be passed to all clients
     * @param gid The game id
     */
    private onStateUpdate(gid: string) {
        this.io.of(`/${gid}`).emit(SOCKET.STATE_UPDATE, gameServer.gameState(gid));
    }
}
export default new Io()