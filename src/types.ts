export type GameState = {
    uuid: string,
    width: number,
    height: number
}

export type UserState = {
    name: string,
    uuid: string,
    x: number,
    y: number,
    vx: number,
    vy: number
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

export type State = {
    game: GameState,
    //user: UserState,
    users: UserState[],
    food: FoodsState
};