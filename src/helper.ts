/**
 * Socket messages
 */
export const SOCKET = {
    INIT_NSP: "socket_initNsp",
    KEY_DOWN: "socket_keyDown",
    KEY_UP: "socket_keyUp",
    GET_STATE: "socket_getState",
    STATE_UPDATE: "socket_stateUpdate",
    MOUSE_MOVE: "socket_mouseMove",
    MOUSE_CLICK: "socket_mouseClick"
}

/**
 * Dispatcher events
 */
export const EVENT = {
    RESIZE: "resize",
    KEY_PRESSED: "key_pressed",
    KEY_DOWN: "event_keyDown",
    KEY_UP: "event_keyDown",
    STATE_UPDATE: "event_stateUpdate",
    DESTROY_USER: "event_destroyUser"
};

/**
 * Tick interval shared between server and client
 */
export const server_tick_interval = 1000 / 60;

export const client_tick_interval = 1000 / 60;

/** 
 * Const to convert degrees in radians
 */
export const D2R = Math.PI / 180;

/**
 * Const to convert radians in degrees
 */
export const R2D = 180 / Math.PI;

/**
 * Round
 * @param value The number to round
 * @param decimal How many decimals to keep
 */
export const round = (value: number, decimal: number = 0) => {
    const pow = Math.pow(10, decimal);
    return Math.round(value * pow) / pow;
}

/**
 * Test a number to be between top and down limit
 * @param number The number to test
 * @param a The down limit
 * @param b The top limit
 * @param inclusive If top and down limits are included in the test
 */
export const between = (number: number, a: number, b: number, inclusive: boolean = true): boolean => {
    if (a > b) return false;
    if (inclusive) {
        return number >= a && number <= b;
    }
    return number > a && number < b;
}

export const keyboard = {
    isLeft(k: number): boolean {
        return k === 37 || k === 81 || k === 65;
    },
    isRight(k: number): boolean {
        return k === 39 || k === 68;
    },
    isUp(k: number): boolean {
        return k === 38 || k === 90;
    },
    isDown(k: number): boolean {
        return k === 40 || k === 83;
    },
    isMove(k: number): boolean {
        return keyboard.isLeft(k) || keyboard.isRight(k) || keyboard.isUp(k) || keyboard.isDown(k);
    },
}

