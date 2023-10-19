import QuizCategorySummary from './QuizCategorySummary.js';
import InvalidPlayerNameError from './errors/InvalidPlayerNameError.js';
import InvalidScoreTypeError from './errors/InvalidScoreTypeError.js';
import InvalidCategorySummaryTypeError from './errors/InvalidCategorySummaryTypeError.js';

/** Holds all the summary data of a Quiz */
class QuizResultSummary {
  #playerName;

  #score;

  #allCategorySummaries;

  /**
   * Creates a QuizResultSummary object.
   *
   * @param {string} playerName - The playerName of the player.
   * @param {number} score - The score of the player.
   */
  constructor(playerName, score) {
    this.#setPlayerName(playerName);
    this.#setScore(score);
    this.#allCategorySummaries = [];
  }

  #setPlayerName(playerName) {
    this.#validatePlayerName(playerName);
    this.#playerName = playerName;
  }

  // eslint-disable-next-line class-methods-use-this
  #validatePlayerName(playerName) {
    if (typeof playerName !== 'string' || playerName.trim() === '') {
      throw new InvalidPlayerNameError();
    }
  }

  #setScore(score) {
    this.#validateScore(score);
    this.#score = score;
  }

  // eslint-disable-next-line class-methods-use-this
  #validateScore(score) {
    if (typeof score !== 'number') {
      throw new InvalidScoreTypeError('The provided score must be a number!');
    }
  }

  /**
   * Adds a QuizCategorySummary to #allCategorySummaries.
   * @param {QuizCategorySummary} categorySummary - The QuizCategorySummary to be added.
   */
  addCategorySummary(categorySummary) {
    this.#validateCategorySummary(categorySummary);
    this.#allCategorySummaries.push(categorySummary);
  }

  // eslint-disable-next-line class-methods-use-this
  #validateCategorySummary(categorySummary) {
    if (!(categorySummary instanceof QuizCategorySummary)) {
      throw new InvalidCategorySummaryTypeError();
    }
  }

  /**
   * Returns the summary in string format.
   *
   * @returns {string} - String containing all the summary information.
   */
  toString() {
    return this.toArray().join(', ');
  }

  /**
   * Returns the summary in the format of an array with strings.
   *
   * @returns {string[]} - An array of strings containing the summary information.
   */
  toArray() {
    const summary = [`playerName: ${this.#playerName}`, `score: ${this.#score}`];
    this.#allCategorySummaries.forEach((categorySummary) => {
      const categoryArray = categorySummary.toArray();
      summary.push(`- ${categoryArray[0]}`);
      for (let i = 1; i < categoryArray.length; i += 1) {
        summary.push(`  - ${categoryArray[i]}`);
      }
    });
    return summary;
  }

  get playerName() {
    return this.#playerName;
  }

  get score() {
    return this.#score;
  }

  get allCategorySummaries() {
    return this.#allCategorySummaries;
  }
}

export default QuizResultSummary;
