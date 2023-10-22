export default class QuestionFormatError extends Error {
  constructor(index, message) {
    super(`Question at index ${index} format error: ${message}`);
    this.name = 'QuestionFormatError';
  }
}
