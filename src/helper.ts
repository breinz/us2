/**
 * Socket messages
 */
export const SOCKET = {
    INIT_NSP: "socket_initNsp",
    KEY_DOWN: "socket_keyDown",
    KEY_UP: "socket_keyDown"
}

/**
 * Dispatcher events
 */
export const EVENT = {
    RESIZE: "resize",
    KEY_PRESSED: "key_pressed",
    KEY_DOWN: "event_keyDown",
    KEY_UP: "event_keyDown"
};

export const between = (number: number, a: number, b: number, inclusive: boolean = true): boolean => {
    if (a > b) return false;
    if (inclusive) {
        return number >= a && number <= b;
    }
    return number > a && number < b;
}

