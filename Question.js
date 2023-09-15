/** 
 * Represents a question. Contains the question text, different choices and the index of the correct choice
 * in choices.
 */
class Question {
  #text;
  #choices;
  #correctChoice;
  #category

  /**
   * Create a question instance.
   * @param {object} arguments - An object containing all the arguments for the constructor.
   * @param {string} arguments.text - The question text.
   * @param {Array<string>} arguments.choices - The multiple choices.
   * @param {string} arguments.correctChoice - The correct choice.
   * @param {string} [arguments.category] - The category of the question.
   */
  constructor({text, choices, correctChoice, category = 'undefined'}) {
    this.#setText(text);
    this.#setChoices(choices);
    this.#setcorrectChoice(correctChoice);
    this.#setCategory(category);
  }

  /**
   * Gets the question text.
   * 
   * @returns {string} this.#text - The question text.
   */
  get text() {  
    return this.#text;
  }

  /**
   * Sets the question text.
   * 
   * @param {string} text - The question text.
   */
  #setText(text) {
    if (typeof text !== 'string') {
      throw new TypeError("Question text must be a string!");
    }
    this.#text = text;
  }

  /**
   * Gets the choices.
   * 
   * @returns {Array<string>} this.#choices - The multiple choices.
   */
  get choices() {
    return this.#choices;
  }

  /**
   * Sets the question choices.
   * 
   * @param {Array<string>} choices - The question choices.
   */
  #setChoices(choices) {
    if (!Array.isArray(choices)) {
      throw new TypeError("Choices must be an array!");
    }
    choices.forEach((choice) => {
      if (typeof choice !== 'string') {
        throw new TypeError("Each choice must be a string!");
      }
    })

    this.#choices = choices;
  }

  /**
   * Gets the correct choice.
   * 
   * @returns {string} this.#correctChoice - The correct choice to the question.
   */
  get correctChoice() {
    return this.#correctChoice;
  }

  /**
   * Sets the correct choice to the question.
   * 
   * @param {string} correctChoice - The correct choice.
   */
  #setcorrectChoice(correctChoice) {
    if (typeof correctChoice !== 'string') {
      throw new TypeError("The correct choice must be a string!");
    }
    this.#correctChoice = correctChoice;
  }

  /**
   * Getter for this.#category
   * @returns {string} - The category.
   */
  get category() {
    return this.#category;
  }

  /**
   * Method for setting the category name.
   * @param {string} categoryName - The name of the category.
   */
  #setCategory(categoryName) {
    if (typeof categoryName !== 'string') {
      throw new TypeError('Category must be a string');
    }
    if (categoryName.length < 1) {
      throw new RangeError('The name of the category cannot be empty');
    }
    this.#category = categoryName;
  }

}

export default Question;