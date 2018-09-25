export type GameState = {
    uuid: string
}

export type UserState = {
    name: string,
    uuid: string,
    x: number,
    y: number,
    vx: number,
    vy: number
};

export type State = {
    game: GameState,
    //user: UserState,
    users: UserState[]
};