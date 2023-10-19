export default class FilesystemReadError extends Error {
  constructor(message = 'Could not read from filesystem!') {
    super(message);
    this.name = 'FilesystemReadError';
  }
}
