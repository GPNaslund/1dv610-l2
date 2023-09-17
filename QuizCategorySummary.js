/** Represents a summary of a category */
class QuizCategorySummary {
  #nameOfCategory;
  #amountOfQuestions;
  #amountOfCorrectAnswers;
  #percentageOfCorrectAnswers;

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
    const percentageOfCorrectAnswers = parseFloat(((amountOfCorrectAnswers / amountOfQuestions) * 100).toFixed(2));
    this.#percentageOfCorrectAnswers = percentageOfCorrectAnswers;
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
   * Getter for #percentageOfCorrectAnswers.
   *
   * @readonly
   * @memberof QuizCategorySummary
   */
  get percentageOfCorrectAnswers() {
    return this.#percentageOfCorrectAnswers;
  }

  /**
   * Method for returning the summary as a string.
   * 
   * @returns {string} - The summary in string format.
   */
  toString() {
    return [
      `category: ${this.#nameOfCategory}`,
      `amount of questions: ${this.#amountOfQuestions}`,
      `amount of correct answers: ${this.#amountOfCorrectAnswers}`,
      `correct percentage: ${this.#percentageOfCorrectAnswers}%`
    ].join(", ");
  }

  /**
   * Method for returning the summary as an array.
   * 
   * @returns {string[]} - The summary as strings in an array.
   */
  toArray() {
    const categorySummary = [`category: ${this.#nameOfCategory}`, `amount of questions: ${this.#amountOfQuestions}`,
  `amount of correct answers: ${this.#amountOfCorrectAnswers}`, `correct percentage: ${this.#percentageOfCorrectAnswers}%`];
    return categorySummary; 
  }

}

export default QuizCategorySummary;