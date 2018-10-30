import SIBullet from "./SIBullet";
import SUser from "../SUser";
import { BulletState } from "../../types";
import SABullet from "./SABullet";

export default class SBaseBullet extends SABullet {

    constructor(user: SUser, angle: number) {
        super(user, angle);
    }
}