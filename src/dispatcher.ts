class Dispatcher {

    /**
     * List of events and associated function
     */
    private catalog: { [index: string]: Function[] } = {}

    /**
     * Dispatch an event with potential params
     * @param type Type of event
     * @param args Args
     */
    public dispatch(type: string, ...args: any[]) {
        if (!(type in this.catalog)) return;

        this.catalog[type].forEach(callback => {
            callback.apply(null, args)
        });
    }

    /**
     * Listen to an event
     * @param type Type of event
     * @param callback Callback function
     */
    public on(type: string, callback: Function) {
        if (this.catalog[type] === undefined) {
            this.catalog[type] = []
        }
        this.catalog[type].push(callback)
    }

    /**
     * Stop listening to an event
     * @param type Type of event
     * @param callback Callback function
     */
    public off(type: string, callback: Function) {
        for (let index = this.catalog[type].length - 1; index >= 0; index--) {
            if (this.catalog[type][index] === callback) {
                delete this.catalog[type][index]
            }

        }
    }
}

// Singleton
export default new Dispatcher()