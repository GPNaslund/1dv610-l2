import QuizCategorySummary from './QuizCategorySummary.js';

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
    this.#playerName = playerName;
    this.#score = score;
    this.#allCategorySummaries = [];
  }

  /**
   * Adds a QuizCategorySummary to #allCategorySummaries.
   * @param {QuizCategorySummary} categorySummary - The QuizCategorySummary to be added.
   */
  addCategorySummary(categorySummary) {
    if (categorySummary instanceof QuizCategorySummary === false) throw new TypeError('Argument must be and instance of QuizCategorySummary');
    this.#allCategorySummaries.push(categorySummary);
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

  /**
   * Getter for #playerName.
   *
   * @readonly
   * @memberof QuizResultSummary
   */
  get playerName() {
    return this.#playerName;
  }

  /**
   * Getter for #score.
   *
   * @readonly
   * @memberof QuizResultSummary
   */
  get score() {
    return this.#score;
  }

  /**
   * Getter for #allCategorySummaries.
   *
   * @readonly
   * @memberof QuizResultSummary
   */
  get allCategorySummaries() {
    return this.#allCategorySummaries;
  }
}

export default QuizResultSummary;
