export default class QuizAlreadyFinishedError extends Error {
  constructor(message = 'Quiz has already finished.') {
    super(message);
    this.name = 'QuizAlreadyFinishedError';
  }
}
