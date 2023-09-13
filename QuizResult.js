/** Class for storing the outcome of answers and generating a summary */
class QuizResult {
  #username;
  #score;
  #questionResultDetails;

  /**
   * Initializes username, score and questionResultDetails.
   * 
   * @param {string} username - The username
   * @param {number} score - The users score.
   */

  constructor(username, score) {
    this.#setUsername(username);
    this.#setScore(score);
    this.#questionResultDetails = [];
  }

  /**
   * Validates and sets #username field.
   * 
   * @param {string} username - The username provided.
   */
  #setUsername(username) {
    if (typeof username !== 'string') throw new TypeError('Username must be a string');
    if (username.length < 1) throw new RangeError('Username cannot be empty');
    this.#username = username;
  }

  /**
   * Validates and sets the #score field.
   * 
   * @param {number} score 
   */
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
   * @returns {Array} - Containing all the added question result objects.
   * @readonly
   * @memberof QuizResult
   */
  get questionResultDetails() {
    return this.#questionResultDetails;
  }

  /**
   * Method for adding a questionResultDetail to #questionResultDetails.
   * @param {object} arguments - Object containing all the arguments to add.
   * @param {string} arguments.questionText - The question text.
   * @param {string[]} arguments.questionChoices - The choices of the question.
   * @param {string} arguments.correctChoice - The correct choice of the question.
   * @param {string} arguments.selectedChoice - The user selected choice.
   * @param {boolean} arguments.wasCorrect - Boolean indicating if user selected correct choice.
   * @param {string} arguments.category - The category of the question.
   */
  addQuestionResult({questionText, questionChoices, correctChoice, selectedChoice, wasCorrect, category}) {
    this.#validateQuestionResultInput(questionText, questionChoices, correctChoice, selectedChoice, wasCorrect, category);
    this.#questionResultDetails.push({
      questionText: questionText,
      questionChoices: questionChoices,
      correctChoice: correctChoice,
      selectedChoice: selectedChoice,
      wasCorrect: wasCorrect,
      category: category
    })
  }

  /**
   * Method for validating the arguments used to add a questionResultDetail to #questionResultDetails.
   *  
   * @param {string} questionText - The question text.
   * @param {string[]} questionChoices - The choices of the question.
   * @param {string} correctChoice - The correct choice of the question.
   * @param {string} selectedChoice - The user selected choice.
   * @param {boolean} wasCorrect - Boolean indicating if user selected correct choice.
   * @param {string} category - The category of the question.
   */
  #validateQuestionResultInput(questionText, questionChoices, correctChoice, selectedChoice, wasCorrect, category) {
    if (typeof questionText !== 'string') throw new TypeError('Question text must be a string!');
    if (questionText.length < 1) throw new RangeError('Question text cannot be empty');
    if (!Array.isArray(questionChoices)) throw new TypeError('Question choices must be an array');
    if (questionChoices.length < 1) throw new RangeError('Question choices cannot be empty');
    questionChoices.forEach(choice => {
      if (typeof choice !== 'string') throw new TypeError('Each entry in Question choices must be a string');
    })
    if (typeof correctChoice !== 'string') throw new TypeError('Correct choice must be a string');
    if (correctChoice.length < 1) throw new RangeError('Correct choice cannot be empty');
    if (typeof selectedChoice !== 'string') throw new TypeError('Selected choice must be a string');
    if (selectedChoice.length < 1) throw new RangeError('Selected choice cannot be empty');
    if (typeof wasCorrect !== 'boolean') throw new TypeError('WasCorrect must be a boolean');
    if (typeof category !== 'string') throw new TypeError('Selected choice must be a string');
    if (category.length < 1) throw new RangeError('Selected choice cannot be empty');
  }

  /**
   * Method for generating a summary of all the categories provided in the #questionResultDetails array.
   * 
   * @returns {object} Object containing all the summary data for every category.
   */
  generateSummary() {
    const allCategories = new Set(this.#questionResultDetails.map(result => result.category));
    const allSummaries = {
      username: this.#username,
      score: this.#score,
      summary: {},
    };
    for (const category of allCategories) {
      allSummaries.summary[category] = this.#generateCategorySummary(category);
    }
    return allSummaries;
  }

  /**
   * Method for generating a summary for a category.
   * 
   * @param {string} categoryName - The name of the category to summarize.
   * @returns {object} An object containing the summary information 
   */
  #generateCategorySummary(categoryName) {
    const allResultDetailsForCategory = this.#questionResultDetails.filter(result => result.category === categoryName);
    const allResultsWithCorrectAnswer = allResultDetailsForCategory.filter(result => result.wasCorrect === true);
    const amountOfQuestions = allResultDetailsForCategory.length;
    const amountOfCorrectAnswers = allResultsWithCorrectAnswer.length;
    const percentageOfCorrect = parseFloat(((amountOfCorrectAnswers / amountOfQuestions) * 100).toFixed(2));

    const summaryData = {
      category: categoryName,
      questionAmount: amountOfQuestions,
      correctAnswers: amountOfCorrectAnswers,
      percentageOfCorrect: percentageOfCorrect,
    };

    return summaryData;
  }
}

export default QuizResult;