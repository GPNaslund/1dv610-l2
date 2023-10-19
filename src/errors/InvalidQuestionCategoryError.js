export default class InvalidQuestionCategoryError extends Error {
  constructor(message = "Invalid question category provided.") {
    super(message);
    this.name = 'InvalidQuestionCategoryError';
  }
}