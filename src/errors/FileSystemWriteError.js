export default class FilesystemWriteError extends Error {
  constructor(message = 'Could not write to file system!') {
    super(message);
    this.name = 'FilesystemWriteError';
  }
}
