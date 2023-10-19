export default class InvalidCorrectAnswerCountError extends Error {
  constructor(message = "Invalid correct answer count provided.") {
    super(message);
    this.name = 'InvalidCorrectAnswerCountError';
  }
}