import SUser from "../SUser";
import { BulletState } from "../../types";

export default interface SIBullet {

    /**
     * Get the state of the bullet
     */
    getState(): BulletState;
}