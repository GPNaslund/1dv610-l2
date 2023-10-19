export default class EmptyQuestionBankError extends Error {
  constructor(message = 'Question bank cannot be empty.') {
    super(message);
    this.name = 'EmptyQuestionBankError';
  }
}
