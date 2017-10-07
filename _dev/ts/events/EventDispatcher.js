var EventDispatcher = (function () {
    function EventDispatcher() {
        this.listeners = {};
    }
    EventDispatcher.prototype.dispatchEvent = function (event) {
        var e;
        var type;
        if (event instanceof Event) {
            type = event.type;
            e = event;
        }
        else {
            type = event;
            e = new Event(type);
        }
        if (this.listeners[type] != null) {
            e.currentTarget = this;
            for (var i = 0; i < this.listeners[type].length; i++) {
                var listener = this.listeners[type][i];
                try {
                    listener.handler(e);
                }
                catch (error) {
                    if (window.console) {
                        console.error(error.stack);
                    }
                }
            }
        }
    };
    EventDispatcher.prototype.addEventListener = function (type, callback, priority) {
        if (priority === void 0) { priority = 0; }
        if (this.listeners[type] == null) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(new EventListener(type, callback, priority));
        this.listeners[type].sort(function (listener1, listener2) {
            return listener2.priority - listener1.priority;
        });
    };
    EventDispatcher.prototype.removeEventListener = function (type, callback) {
        if (this.hasEventListener(type, callback)) {
            for (var i = 0; i < this.listeners[type].length; i++) {
                var listener = this.listeners[type][i];
                if (listener.equalCurrentListener(type, callback)) {
                    this.listeners[type].splice(i, 1);
                    return;
                }
            }
        }
    };
    EventDispatcher.prototype.clearEventListener = function () {
        this.listeners = {};
    };
    EventDispatcher.prototype.containEventListener = function (type) {
        if (this.listeners[type] == null)
            return false;
        return this.listeners[type].length > 0;
    };
    EventDispatcher.prototype.hasEventListener = function (type, callback) {
        if (this.listeners[type] == null)
            return false;
        for (var i = 0; i < this.listeners[type].length; i++) {
            var listener = this.listeners[type][i];
            if (listener.equalCurrentListener(type, callback)) {
                return true;
            }
        }
        return false;
    };
    return EventDispatcher;
}());
export { EventDispatcher };
var EventListener = (function () {
    function EventListener(type, handler, priority) {
        if (type === void 0) { type = ''; }
        if (priority === void 0) { priority = 0; }
        this.type = type;
        this.handler = handler;
        this.priority = priority;
    }
    EventListener.prototype.equalCurrentListener = function (type, handler) {
        return this.type == type && this.handler == handler;
    };
    return EventListener;
}());
var Event = (function () {
    function Event(type, value) {
        if (type === void 0) { type = ''; }
        if (value === void 0) { value = null; }
        this.type = type;
        this.value = value;
    }
    return Event;
}());
export { Event };
//# sourceMappingURL=EventDispatcher.js.map