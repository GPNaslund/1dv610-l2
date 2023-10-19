export default class InvalidJSONError extends Error {
  constructor(message = 'The provided JSON string is not valid') {
    super(message);
    this.name = 'InvalidJSONError';
  }
}