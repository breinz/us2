import SIBullet from "../bullet/SIBullet";
import SUser from "../SUser";

export default interface SIWeapon {

    /**
     * Fires this weapon
     * @param user The user that fires
     * @param angle The angle to the target
     */
    fire(user: SUser, angle: number): void;
}