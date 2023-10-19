export default class UnexpectedJSONStructureError extends Error {
  constructor(message = 'The parsed JSON object has an unexpected structure') {
    super(message);
    this.name = 'UnexpectedJSONStructureError';
  }
}
