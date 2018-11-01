export type GameState = {
    uuid: string,
    width: number,
    height: number,
    scoreChanged: boolean
}

export type UserState = {
    /** name */
    n: string,
    uuid: string,
    x: number,
    y: number,
    vx: number,
    vy: number,
    /** Food */
    f: number,
    /** Level */
    l: number,
    /** Next level */
    nl: number,
    /** Score */
    s: number
};

export type FoodState = {
    id: string,
    x: number,
    y: number
}

export type FoodsState = {
    id: string,
    f: FoodState[]
}

/**
 * One bullet state
 */
export type BulletState = {
    x: number,
    y: number
}

export type State = {
    /** Game */
    g: GameState,
    /** user */
    u: UserState[],
    /** Foods */
    f: FoodsState,
    /** Bullets */
    b: BulletState[]
};