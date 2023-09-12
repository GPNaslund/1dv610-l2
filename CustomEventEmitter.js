/**
 * Class containing event emitting and calling functionality.
 */
class CustomEventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * Method for subscribing to a named event.
   * 
   * @param {string} event - The event name.
   * @param {Function} listener - The functionality to be triggered on the event.
   */
  on(event, listener) {
    if (this.events[event]) {
      this.events[event].push(listener);
    } else {
      this.events[event] = [listener];
    }
  }

  /**
   * Method for emitting an event that will call all the listener functions
   * that are registered through the on method of that event.
   * 
   * @param {string} event - The event name.
   * @param {object} payload - The data argument called with the listener functionality.
   */
  emit(event, payload) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(payload));
    }
  }
}

export default CustomEventEmitter;