import { State, UserState } from "../types";

export default class Ranking extends PIXI.Container {

    private state: State;

    private arNames: PIXI.Text[];

    private arScore: PIXI.Text[];

    private _stateChanged: boolean;

    constructor() {
        super();

        this.arNames = [];
        this.arScore = [];

        let name: PIXI.Text;
        let score: PIXI.Text;

        for (let i = 0; i < 5; i++) {
            name = new PIXI.Text("pom", {
                fontFamily: "Verdana",
                fontSize: 11
            });
            this.addChild(name);
            name.y = i * name.height;
            this.arNames.push(name);

            score = new PIXI.Text("0", {
                fontFamily: "Verdana",
                fontSize: 9,
                align: "right"
            });
            this.addChild(score);
            score.x = 100;
            score.y = i * name.height;
            this.arScore.push(score);
        }

        this._stateChanged = false;
    }

    /**
     * Update state
     */
    public update(state: State) {
        if (!this.state || state.g.scoreChanged) {
            this.state = state;

            this._stateChanged = true;
        }
    }

    /**
     * Tick
     */
    public tick() {
        if (this._stateChanged) {
            const ar = this.sortUsers();

            for (let i = 0; i < this.arNames.length; i++) {
                if (ar.length <= i) {
                    this.arNames[i].text = "";
                    this.arScore[i].text = "";
                } else {

                    this.arNames[i].text = (i + 1) + " " + ar[i].n;
                    this.arScore[i].text = ar[i].s.toString();
                }
            }
            console.log("Update ranking");
        }

        this._stateChanged = false;

    }

    /**
     * Sort the users by the amount of food
     */
    private sortUsers(): UserState[] {
        return this.state.u.sort((a, b) => {
            if (a.s === b.s) return 0;
            return a.s < b.s ? 1 : -1;
        });
    }
}