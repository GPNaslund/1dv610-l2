export default class InvalidCleanCodeChaptersError extends Error {
  constructor(message = 'Invalid CleanCodeChapters instance') {
    super(message);
    this.name = 'InvalidCleanCodeChaptersError';
  }
}