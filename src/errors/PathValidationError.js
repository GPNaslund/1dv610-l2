class PathValidationError extends Error {
  constructor(message = 'The provided path is invalid.') {
    super(message);
    this.name = 'PathValidationError';
  }
}