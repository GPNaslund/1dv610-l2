export default class InvalidQuestionCountError extends Error {
  constructor(message = 'Invalid question count provided.') {
    super(message);
    this.name = 'InvalidQuestionCountError';
  }
}
