
/**
 * ディスパッチャークラス
 */
export class EventDispatcher {

    listeners: any = {};

    /**
     *
     * @param event
     */
    dispatchEvent(event: any): void {
        let e: Event;
        let type: string;
        if (event instanceof Event) {
            type = event.type;
            e = event;
        } else {
            type = event;
            e = new Event(type);
        }

        if (this.listeners[type] !== undefined) {
            e.currentTarget = this;
            for (const listener of this.listeners[type]) {
                try {
                    listener.handler(e);
                } catch (error) {
                    if (window.console) {
                        console.error(error.stack);
                    }
                }
            }
        }
    }

    /**
     *
     * @param type
     * @param callback
     * @param priority
     */
    addEventListener(type: string, callback: Function, priority = 0): void {
        if (this.listeners[type] === undefined) {
            this.listeners[type] = [];
        }

        this.listeners[type].push(new EventListener(type, callback, priority));
        this.listeners[type].sort((listener1: EventListener, listener2: EventListener) => {
            return listener2.priority - listener1.priority;
        });
    }

    /**
     *
     * @param type
     * @param callback
     */
    removeEventListener(type: string, callback: Function): void {
        if (this.hasEventListener(type, callback)) {
            for (let i = 0; i < this.listeners[type].length; i++) {
                const listener: EventListener = this.listeners[type][i];
                if (listener.equalCurrentListener(type, callback)) {
                    // listener.handler = null;
                    this.listeners[type].splice(i, 1);
                    return;
                }
            }
        }
    }

    /**
     *
     */
    clearEventListener(): void {
        this.listeners = {};
    }

    /**
     *
     * @param type
     * @returns {boolean}
     */
    containEventListener(type: string): boolean {
        if (this.listeners[type] === undefined) return false;
        return this.listeners[type].length > 0;
    }

    /**
     *
     * @param _type
     * @param callback
     * @returns {boolean}
     */
    hasEventListener(_type: string, callback: Function): boolean {
        if (this.listeners[_type] === undefined) return false;
        for (const listener of this.listeners[_type]) {
            if (listener.equalCurrentListener(_type, callback)) {
                return true;
            }
        }
        return false;
    }
}

/**
 *
 */
class EventListener {

    /**
     *
     * @param type
     * @param handler
     * @param priority
     */
    constructor(public type = '', public handler: Function, public priority = 0) {
    }

    /**
     *
     * @param type
     * @param handler
     * @returns {boolean}
     */
    equalCurrentListener(type: string, handler: Function): boolean {
        return this.type === type && this.handler === handler;
    }
}

/**
 *
 */
export class Event {

    currentTarget: any;

    constructor(public type = '', public value: any = undefined) {

    }
}