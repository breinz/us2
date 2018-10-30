import SIBullet from "./SIBullet";
import SUser from "../SUser";
import { BulletState } from "../../types";

export default class SABullet implements SIBullet {

    constructor(user: SUser, angle: number) {
    }

    /**
     * @inheritdoc
     */
    public getState(): BulletState {
        return {
            x: 0,
            y: 0
        };
    }
}