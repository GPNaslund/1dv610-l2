export default class InvalidQuestionResultTypeError extends Error {
  constructor() {
    super("Argument must be of type QuestionResult.");
    this.name = 'InvalidQuestionResultTypeError';
  }
}