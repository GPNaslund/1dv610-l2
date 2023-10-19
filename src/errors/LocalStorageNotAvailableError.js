export default class LocalStorageNotAvailableError extends Error {
  constructor(message = 'Local storage is not available for usage') {
    super(message);
    this.name = 'LocalStorageNotAvailableError';
  }
}
