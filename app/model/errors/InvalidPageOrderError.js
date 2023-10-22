export default class InvalidPageOrderError extends Error {
  constructor() {
    super('The last page must be greater than or equal to the first page');
    this.name = 'InvalidPageOrderError';
  }
}
