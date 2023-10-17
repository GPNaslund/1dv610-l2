import QuestionResult from './QuestionResult.js';
import QuizCategorySummary from './QuizCategorySummary.js';
import QuizResultSummary from './QuizResultSummary.js';

/** Class for storing the outcome of answers and generating a summary */
class QuizResult {
  #playerName;

  #score;

  #questionResults;

  /**
   * Initializes username, score and questionResult.
   *
   * @param {string} playerName - The playerName.
   * @param {number} score - The users score.
   */

  constructor(playerName, score) {
    this.#setPlayerName(playerName);
    this.#setScore(score);
    this.#questionResults = [];
  }

  get playerName() {
    return this.#playerName;
  }

  get score() {
    return this.#score;
  }

  #setPlayerName(playerName) {
    if (typeof playerName !== 'string') throw new TypeError('Username must be a string');
    if (playerName.length < 1) throw new RangeError('Username cannot be empty');
    this.#playerName = playerName;
  }

  #setScore(score) {
    if (typeof score !== 'number') throw new TypeError('Score must be a number');
    this.#score = score;
  }

  /**
   * Method for incrementing the score.
   *
   * @param {number} amount - The amount to increment the score with.
   */
  incrementScore(amount) {
    if (typeof amount !== 'number') throw new TypeError('Score must be a number');
    this.#score += amount;
  }

  /**
   * Getter for #questionsResultDetails.
   *
   * @returns {Array<QuestionResult>} - Containing all the added question result objects.
   * @readonly
   * @memberof QuizResult
   */
  get questionResults() {
    return this.#questionResults;
  }

  /**
   * Method for resetting the score and question results.
   */
  reset() {
    this.#score = 0;
    this.#questionResults = [];
  }

  /**
   * Adds a QuestionResult object to #questionResult
   *
   * @param {QuestionResult} questionResult - The QuestionResult to add.
   */
  addQuestionResult(questionResult) {
    if (questionResult instanceof QuestionResult === false) throw new TypeError('Argument must be of type QuestionResult');
    this.#questionResults.push(questionResult);
  }

  /**
   * Method for generating a summary of all the categories provided in the #questionResult array.
   *
   * @returns {QuizResultSummary} - QuizResultSummary containing all the category summaries.
   */
  generateSummary() {
    const allCategories = new Set(this.#questionResults.map((result) => result.category));
    const quizResultSummary = new QuizResultSummary(this.#playerName, this.#score);

    allCategories.forEach((category) => {
      quizResultSummary.addCategorySummary(this.#generateCategorySummary(category));
    });

    return quizResultSummary;
  }

  /**
   * Method for generating a summary for a category.
   *
   * @param {string} categoryName - The name of the category to summarize.
   * @returns {QuizCategorySummary} - QuizCategorySummary containing the summary information.
   */
  #generateCategorySummary(categoryName) {
    const allResultDetailsForCategory = this.#questionResults.filter(
      (result) => result.category === categoryName,
    );
    const allResultsWithCorrectAnswer = allResultDetailsForCategory.filter(
      (result) => result.wasCorrect === true,
    );
    const amountOfQuestions = allResultDetailsForCategory.length;
    const amountOfCorrectAnswers = allResultsWithCorrectAnswer.length;

    const quizCategorySummary = new QuizCategorySummary(
      categoryName,
      amountOfQuestions,
      amountOfCorrectAnswers,
    );

    return quizCategorySummary;
  }
}

export default QuizResult;
