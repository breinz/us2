import SUser from "./SUser";
import SIBullet from "./bullet/SIBullet";
import { BulletState } from "../types";

export default class SBulletList {

    /**
     * The bullet list
     */
    private list: SIBullet[];

    constructor() {
        this.list = [];
    }

    /**
     * Adds a bullet
     * @param bullet The bullet to add
     */
    public add(bullet: SIBullet) {
        this.list.push(bullet);
    }

    /**
     * Get all the bullets for api
     */
    public getState(): BulletState[] {
        let state: BulletState[] = [];
        for (let i = 0; i < this.list.length; i++) {
            state.push(this.list[i].getState());

        }
        return state;
    }
}