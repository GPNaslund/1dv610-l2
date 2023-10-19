export default class LengthMismatchError extends Error {
  constructor() {
    super('scores and categories arrays must have the same length');
    this.name = 'LengthMismatchError';
  }
}