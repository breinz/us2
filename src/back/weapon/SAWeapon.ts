import SIWeapon from "./SIWeapon";
import SGame from "../SGame";
import SUser from "../SUser";

export default class SAWeapon implements SIWeapon {

    protected game: SGame;

    constructor(game: SGame) {
        this.game = game;
    }

    public fire(user: SUser, angle: number) {

    }
}