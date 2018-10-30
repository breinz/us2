export type GameState = {
    uuid: string,
    width: number,
    height: number,
    scoreChanged: boolean
}

export type UserState = {
    name: string,
    uuid: string,
    x: number,
    y: number,
    vx: number,
    vy: number,
    food: number,
    level: number,
    nextLevel: number,
    score: number
};

export type FoodState = {
    id: string,
    x: number,
    y: number
}

export type FoodsState = {
    id: string,
    food: FoodState[]
}

/**
 * One bullet state
 */
export type BulletState = {
    x: number,
    y: number
}

export type State = {
    game: GameState,
    //user: UserState,
    users: UserState[],
    food: FoodsState,
    bullets: BulletState[]
};