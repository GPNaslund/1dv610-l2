export default class InvalidChapterNumberError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidChapterNumberError';
  }
}
