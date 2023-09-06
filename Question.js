/** Class representing a question. */
class Question {
  #text;
  #choices;
  #correctChoice;

  /**
   * Create a question.
   * @param {string} text - The question text.
   * @param {Array<string>} choices - The multiple choices.
   * @param {string} correctChoice - The correct choice.
   */
  constructor(text, choices, correctChoice) {
    this.text = text;
    this.choices = choices;
    this.correctChoice = correctChoice;
  }

  /**
   * Gets the question text.
   * @returns {string} this.#text - The question text.
   */
  get text() {  
    return this.#text;
  }

  /**
   * Sets the question text.
   * @param {string} text- The question text.
   */
  set text(text) {
    if (typeof text !== 'string') {
      throw new TypeError("Question text must be a string!");
    }
    this.#text = text;
  }

  /**
   * Gets the choices.
   * @returns {Array<string>} this.#choices - The multiple choices.
   */
  get choices() {
    return this.#choices;
  }

  /**
   * Sets the question choices.
   * @param {Array<string>} choices- The question choices.
   */
  set choices(choices) {
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
   * @returns {string} this.#correctChoice - The correct choice to the question.
   */
  get correctChoice() {
    return this.#correctChoice;
  }

  /**
   * Sets the correct choice to the question.
   * @param {string} correctChoice- The correct choice.
   */
  set correctChoice(correctChoice) {
    if (typeof correctChoice !== 'string') {
      throw new TypeError("The correct choice must be a string!");
    }
    this.#correctChoice = correctChoice;
  }

}

export default Question;