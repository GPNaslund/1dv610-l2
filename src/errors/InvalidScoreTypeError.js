export default class InvalidScoreTypeError extends Error {
  constructor(message = 'The score value in the JSON is not of the expected type') {
    super(message);
    this.name = 'InvalidScoreTypeError';
  }
}
