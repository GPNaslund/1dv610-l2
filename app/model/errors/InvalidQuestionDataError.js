export default class InvalidQuestionDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidQuestionDataError';
  }
}
