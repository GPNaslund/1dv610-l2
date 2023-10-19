export default class PersistenceNotInitializedError extends Error {
  constructor(message = "Highscore persistence not initialized.") {
    super(message);
    this.name = 'PersistenceNotInitializedError';
  }
}