export default class InvalidQuestionTypeError extends Error {
  constructor() {
    super("Input must be a Question object.");
    this.name = 'InvalidQuestionTypeError';
  }
}