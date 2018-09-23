import { Server, Socket } from "socket.io";
import { Http2Server } from "http2";
//import message from "./SocketMessages"
//import { Us } from "./us";

class Io {

    private io: Server;

    /**
     * Main socket to /
     */
    private socket: Socket;

    /**
     * List of games
     */
    private games: string[];

    public init(server: Http2Server) {
        this.games = [];

        this.io = require("socket.io")(server)

        this.io.on("connection", (socket: Socket) => {
            this.socket = socket;

            socket.on("cell_connection", (game_id: string) => {
                this.onCellConnection(game_id);
            })

            socket.on("disconnect", (reason) => {
                //console.log("client disconnect", reason);
            })
        })
    }

    private onCellConnection(game_id: string) {
        // Check if that cell is already listening for connections
        for (let index = 0; index < this.games.length; index++) {
            if (this.games[index] === game_id) {
                return;
            }
        }

        const io = this.io;

        // --------------------------------------------------
        // Allow connections to that game
        // --------------------------------------------------

        this.io.of(`/${game_id}`).on("connection", (cellSocket: Socket) => {

            const socket = io.of(`/${game_id}`);

            cellSocket.on("pom", (params) => {
                socket.emit("blah", params)
            })
        })

        this.games.push(game_id)
    }
}
export default new Io()