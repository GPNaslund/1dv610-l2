export default class FileTypeError extends Error {
  constructor(message = 'File is not a JSON file.') {
    super(message);
    this.name = 'FileTypeError';
  }
}
