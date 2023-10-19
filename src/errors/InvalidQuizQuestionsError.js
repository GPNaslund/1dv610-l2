export default class InvalidQuizQuestionsError extends Error {
  constructor(message = "Invalid QuizQuestions object provided.") {
    super(message);
    this.name = 'InvalidQuizQuestionsError';
  }
}
