import { Server, Socket } from "socket.io";
import { Http2Server } from "http2";
import { SOCKET } from "./helper";
import { gameServer } from "./app";
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

        this.io.on("connection", (socket: Socket) => {

            // Initialize a namespace
            socket.on(SOCKET.INIT_NSP, this.initNsp);

            socket.on("disconnect", (reason) => {
                //console.log("client disconnect", reason);
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

            gameSocket.on(SOCKET.KEY_DOWN, (key: number) => {
                gameServer.onKeyDown(key);
            })

        });

        this.games.push(game_id);

        ack();
    }
}
export default new Io()