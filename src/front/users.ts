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
    private arUsers: User[];//{ [id: string]: User };//User[];

    /**
     * Internal use only
     */
    private uid: string;


    constructor(uid: string) {
        this.uid = uid;

        this.arUsers = [];

        dispatcher.on(EVENT.DESTROY_USER, this.onDestroyUser);
    }

    public tick() {
        for (let i = 0; i < this.arUsers.length; i++) {
            this.arUsers[i].tick();
        }
    }

    /**
     * Update the users
     * @param state The game state
     */
    public update(state: State) {
        // Run onBeforeUpdate
        this.onBeforeUpdate();

        let s: UserState, u: User;
        nextState: for (let i = 0; i < state.users.length; i++) {

            s = state.users[i];

            // Check if that user exists
            for (let j = 0; j < this.arUsers.length; j++) {
                if (this.arUsers[j].id === s.uuid) {
                    this.arUsers[j].updateState(s);
                    continue nextState;
                }

            }

            /** @todo Check if the user is definitely too far and avoid creating it to delete it strait after */

            // The user doesn't exist yet, create it
            const newUser = new User(s);
            this.arUsers.push(newUser);

            // If that user is me, save it
            if (s.uuid === this.uid) {
                this.me = newUser;
            }
        }

        // Run onAfterUpdate
        this.onAfterUpdate();
    }

    /**
     * Before update
     */
    private onBeforeUpdate() {
        // Run onBeforeUpdate on every user
        for (let i = 0; i < this.arUsers.length; i++) {
            this.arUsers[i].onBeforeUpdate();

        }
    }

    /**
     * After update
     */
    private onAfterUpdate() {
        // Run onAfterUpdate on every user
        this.arUsers.map((user) => {
            user.onAfterUpdate();
        });
    }

    /**
     * A user will be destroyed
     */
    private onDestroyUser = (user: User) => {

        // Remove it from the list
        for (let i = 0; i < this.arUsers.length; i++) {
            if (this.arUsers[i] === user) {
                this.arUsers.splice(i, 1);
                break;
            }
        }
    }
}