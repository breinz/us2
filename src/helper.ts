/**
 * Socket messages
 */
export const SOCKET = {
    INIT_NSP: "socket_initNsp",
    KEY_DOWN: "socket_keyDown",
    KEY_UP: "socket_keyUp",
    GET_STATE: "socket_getState",
    STATE_UPDATE: "socket_stateUpdate"
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
 * Const to convert degrees in radians
 */
export const D2R = Math.PI / 180;

/**
 * Const to convert radians in degrees
 */
export const R2D = 180 / Math.PI;

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
    isUp(k: number): boolean {
        return k === 38 || k === 90;
    },
    isLeft(k: number): boolean {
        return k === 37;
    },
    isMove(k: number): boolean {
        return keyboard.isUp(k) || keyboard.isLeft(k);
    },
}

