import User from "./User";
import { State, UserState } from "../types";
import dispatcher from "../dispatcher";
import { EVENT } from "../helper";

export default class Users {

    /**
     * The player
     */
    public me: User;

    /**
     * List of users
     */
    private arUsers: { [id: string]: User };//User[];

    /**
     * Internal use only
     */
    private uid: string;


    constructor(uid: string) {
        this.uid = uid;
        this.arUsers = {};

        dispatcher.on(EVENT.DESTROY_USER, this.onDestroyUser);
    }

    /**
     * Update the users
     * @param state The game state
     */
    public update(state: State) {
        // Run onBeforeUpdate on every User
        this.onBeforeUpdate();

        let s: UserState, u: User;
        for (let i = 0; i < state.users.length; i++) {
            s = state.users[i];
            u = this.arUsers[s.uuid];
            if (u) {
                u.update(s);
            } else {
                const newUser = new User(s);
                this.arUsers[s.uuid] = newUser

                // If that user is me, save it
                if (s.uuid === this.uid) {
                    this.me = newUser;
                }
            }
        }

        // Run onAfterUpdate on every User
        this.onAfterUpdate();
    }

    /**
     * Before update
     */
    private onBeforeUpdate() {
        for (const id in this.arUsers) {
            if (this.arUsers.hasOwnProperty(id)) {
                this.arUsers[id].onBeforeUpdate();
            }
        }
    }

    /**
     * After update
     */
    private onAfterUpdate() {
        for (const id in this.arUsers) {
            if (this.arUsers.hasOwnProperty(id)) {
                this.arUsers[id].onAfterUpdate();
            }
        }
    }

    /**
     * A user will be destroyed, remove it from the list
     */
    private onDestroyUser = (user: User) => {
        delete this.arUsers[user.id];
    }
}