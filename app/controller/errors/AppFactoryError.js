export default class AppFactoryError extends Error {
  constructor(message = 'Factory instance cannot be null') {
    super(message);
    this.name = 'AppFactoryError';
  }
}
