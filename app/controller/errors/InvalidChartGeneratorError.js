export default class InvalidChartGeneratorError extends Error {
  constructor(message = 'Invalid ChartGenerator instance') {
    super(message);
    this.name = 'InvalidChartGeneratorError';
  }
}
