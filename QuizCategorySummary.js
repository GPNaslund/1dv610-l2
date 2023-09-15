/** Represents a summary of a category */
class QuizCategorySummary {
  #nameOfCategory;
  #amountOfQuestions;
  #amountOfCorrectAnswers;
  #percentageOfCorrect;

  /**
   * Creates a QuizCategorySummary object.
   * @param {string} nameOfCategory - The name of the category.
   * @param {number} amountOfQuestions - The total amount of questions in that category.
   * @param {number} amountOfCorrectAnswers - The total amount of correct answers in that category.
   */
  constructor(nameOfCategory, amountOfQuestions, amountOfCorrectAnswers) {
    this.#nameOfCategory = nameOfCategory;
    this.#amountOfQuestions = amountOfQuestions;
    this.#amountOfCorrectAnswers = amountOfCorrectAnswers;
    const percentageOfCorrect = parseFloat(((amountOfCorrectAnswers / amountOfQuestions) * 100).toFixed(2));
    this.#percentageOfCorrect = percentageOfCorrect;
  }

  /**
   * Getter for #nameOfCategory.
   *
   * @readonly
   * @memberof QuizCategorySummary
   */
  get nameOfCategory() {
    return this.#nameOfCategory;
  }

  /**
   * Getter for #amountOfQuestions.
   *
   * @readonly
   * @memberof QuizCategorySummary
   */
  get amountOfQuestions() {
    return this.#amountOfQuestions;
  }

  /**
   * Getter for #amountOfCorrectAnswers.
   *
   * @readonly
   * @memberof QuizCategorySummary
   */
  get amountOfCorrectAnswers() {
    return this.#amountOfCorrectAnswers;
  }

  /**
   * Getter for #percentageOfCorrect.
   *
   * @readonly
   * @memberof QuizCategorySummary
   */
  get percentageOfCorrect() {
    return this.#percentageOfCorrect;
  }

}

export default QuizCategorySummary;