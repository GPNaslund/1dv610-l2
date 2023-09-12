class CustomEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (this.events[event]) {
      this.events[event].push(listener);
    } else {
      this.events[event] = [listener];
    }
  }

  emit(event, payload) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(payload));
    }
  }
}

export default CustomEventEmitter;