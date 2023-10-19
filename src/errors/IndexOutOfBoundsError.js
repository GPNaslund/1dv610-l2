export default class IndexOutOfBoundsError extends Error {
  constructor(length) {
    super(`Index out of range. Must be between 0 - ${length - 1}.`);
    this.name = 'IndexOutOfBoundsError';
  }
}