/** 
 * Represents a question. Contains the question text, different choices and the index of the correct choice
 * in choices.
 */
class Question {
  #text;
  #choices;
  #correctChoiceIndex;
  #category

  /**
   * Create a question instance.
   * @param {string} text - The question text.
   * @param {Array<string>} choices - The multiple choices.
   * @param {number} correctChoiceIndex - The correct choice index.
   * @param {string} category - The category of the question.
   */
  constructor(text, choices, correctChoiceIndex, category = 'undefined') {
    this.#setText(text);
    this.#setChoices(choices);
    this.#setCorrectChoiceIndex(correctChoiceIndex);
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
   * @returns {string} this.#correctChoiceIndex - The correct choice to the question.
   */
  get correctChoiceIndex() {
    return this.#correctChoiceIndex;
  }

  /**
   * Sets the correct choice to the question.
   * 
   * @param {number} correctChoiceIndex - The correct choice.
   */
  #setCorrectChoiceIndex(correctChoiceIndex) {
    if (typeof correctChoiceIndex !== 'number') {
      throw new TypeError("The correct choice index must be a number!");
    }
    if (correctChoiceIndex < 0 || correctChoiceIndex > this.#choices.length - 1) {
      if (this.#choices.length === 1) {
        throw new RangeError("There is only one choice option, correct choice index can only be 0");
      } else {
        throw new RangeError("The correct choice index must be between 0 - " + (this.#choices.length - 1));
      }
    }
    this.#correctChoiceIndex = correctChoiceIndex;
  }

  get category() {
    return this.#category;
  }

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