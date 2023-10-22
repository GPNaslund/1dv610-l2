export default class InvalidTypeError extends Error {
  constructor(parameter, expectedType) {
    super(`${parameter} must be a ${expectedType}`);
    this.name = 'InvalidTypeError';
  }
}
