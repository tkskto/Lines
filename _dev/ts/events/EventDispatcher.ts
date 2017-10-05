﻿
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

        if (this.listeners[type] != null) {
            e.currentTarget = this;
            for (let i: number = 0; i < this.listeners[type].length; i++) {
                let listener: EventListener = this.listeners[type][i];
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
    addEventListener(type: string, callback: Function, priority: number = 0): void {
        if (this.listeners[type] == null) {
            this.listeners[type] = [];
        }

        this.listeners[type].push(new EventListener(type, callback, priority));
        this.listeners[type].sort(function (listener1: EventListener, listener2: EventListener) {
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
            for (let i: number = 0; i < this.listeners[type].length; i++) {
                let listener: EventListener = this.listeners[type][i];
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
        if (this.listeners[type] == null) return false;
        return this.listeners[type].length > 0;
    }

    /**
     *
     * @param type
     * @param callback
     * @returns {boolean}
     */
    hasEventListener(type: string, callback: Function): boolean {
        if (this.listeners[type] == null) return false;
        for (let i: number = 0; i < this.listeners[type].length; i++) {
            let listener: EventListener = this.listeners[type][i];
            if (listener.equalCurrentListener(type, callback)) {
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
    constructor(public type: string = '', public handler: Function, public priority: number = 0) {
    }

    /**
     *
     * @param type
     * @param handler
     * @returns {boolean}
     */
    equalCurrentListener(type: string, handler: Function): boolean {
        return this.type == type && this.handler == handler;
    }
}

/**
 *
 */
export class Event {

    currentTarget: any;

    constructor(public type: string = '', public value: any = null) {

    }
}