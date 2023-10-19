export default class InvalidPlayerNameError extends Error {
  constructor(message = 'Player name should be a valid non-empty string.') {
    super(message);
    this.name = 'InvalidPlayerNameError';
  }
}
