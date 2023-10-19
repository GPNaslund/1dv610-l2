export default class InvalidCategorySummaryTypeError extends Error {
  constructor() {
    super('Argument must be an instance of QuizCategorySummary.');
    this.name = 'InvalidCategorySummaryTypeError';
  }
}
