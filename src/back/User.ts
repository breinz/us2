import * as uniqid from "uniqid";
import { UserState } from "../types";

export default class User {

    /** The unique user's id */
    public uuid: string;

    /** The user's name */
    public name: string;

    constructor(name: string) {
        this.name = name;
        this.uuid = uniqid();
    }

    /**
     * The user's state
     */
    public get state(): UserState {
        return {
            name: this.name,
            uuid: this.uuid
        };
    }
}