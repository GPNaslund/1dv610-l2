export default class InvalidQuestionError extends Error {
  constructor(message = 'Invalid question object provided.') {
    super(message);
    this.name = 'InvalidQuestionError';
  }
}
