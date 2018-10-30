import SBaseBullet from "../bullet/SBaseBullet";
import SUser from "../SUser";
import SAWeapon from "./SAWeapon";

export default class SBaseWeapon extends SAWeapon {

    public fire(user: SUser, angle: number) {
        const bullet = new SBaseBullet(user, angle);
        this.game.bullets.add(bullet);
    }
}