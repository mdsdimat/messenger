interface IListeners {
    [key: string]: unknown[];
}

class EventBus {
    private listeners: IListeners;
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: (oldProps?: {}, newProps?: {}) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: (oldProps?: {}, newProps?: {}) => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]) {
        this.listeners[event].forEach(function(listener: (...args: unknown[]) => void) {
            listener(...args);
        });
    }
}

export default EventBus;