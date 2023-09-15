import QuestionResult from "./QuestionResult.js";
import QuizCategorySummary from "./QuizCategorySummary.js";

/** Holds all the summary data of a Quiz */
class QuizResultSummary {
  #username;
  #score;
  #allCategorySummaries;

  /**
   * Creates a QuizResultSummary object.
   * 
   * @param {string} username - The username of the player.
   * @param {number} score - The score of the player.
   */
  constructor(username, score) {
    this.#username = username;
    this.#score = score;
    this.#allCategorySummaries = [];
  }

  /**
   * Adds a QuizCategorySummary to #allCategorySummaries.
   * @param {QuizCategorySummary} categorySummary - The QuizCategorySummary to be added.
   */
  addCategorySummary(categorySummary) {
    if (categorySummary instanceof QuizCategorySummary === false) throw new TypeError("Argument must be and instance of QuizCategorySummary");
    this.#allCategorySummaries.push(categorySummary);
  }

  /**
   * Getter for #username.
   *
   * @readonly
   * @memberof QuizResultSummary
   */
  get username() {
    return this.#username;
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

}

export default QuizResultSummary;