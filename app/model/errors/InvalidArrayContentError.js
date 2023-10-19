export default class InvalidArrayContentError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidArrayContentError';
  }
}