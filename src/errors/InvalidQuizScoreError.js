export default class InvalidQuizScoreError extends Error {
  constructor(message = 'The provided object is not a valid QuizScore') {
    super(message);
    this.name = 'InvalidQuizScoreError';
  }
}
