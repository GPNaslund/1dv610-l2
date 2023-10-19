export default class InvalidElementError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidElementError';
  }
}