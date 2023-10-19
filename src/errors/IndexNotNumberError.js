export default class IndexNotNumberError extends Error {
  constructor() {
    super('The provided index must be a number.');
    this.name = 'IndexNotNumberError';
  }
}
