export default class InvalidQuestionChoiceError extends Error {
  constructor(message = "Invalid question choice provided.") {
    super(message);
    this.name = 'InvalidQuestionChoiceError';
  }
}