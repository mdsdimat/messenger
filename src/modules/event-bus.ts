interface IListeners {
    [key: string]: ((...args: {}[]) => void)[];
}

class EventBus {
    private listeners: IListeners;
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: (...args: {}[]) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: (...args: {}[]) => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: {}[]) {
        this.listeners[event].forEach(function(listener: (...args: {}[]) => void) {
            listener(...args);
        });
    }
}

export default EventBus;