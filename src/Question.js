import InvalidQuestionChoiceError from './errors/InvalidQuestionChoiceError.js';
import InvalidQuestionCategoryError from './errors/InvalidQuestionCategoryError.js';

/**
 * Represents a question. Contains the question text, different
 * choices, the correct choice and the category of a question.
 */
class Question {
  #text;

  #choices;

  #correctChoice;

  #category;

  /**
   * Create a question instance.
   * @param {object} arguments - An object containing all the arguments for the constructor.
   * @param {string} arguments.text - The question text.
   * @param {Array<string>} arguments.choices - The multiple choices.
   * @param {string} arguments.correctChoice - The correct choice.
   * @param {string} [arguments.category] - The category of the question.
   */
  constructor({
    text, choices, correctChoice, category = 'undefined',
  }) {
    this.#setText(text);
    this.#setChoices(choices);
    this.#setcorrectChoice(correctChoice);
    this.#setCategory(category);
  }

  get text() {
    return this.#text;
  }

  #setText(text) {
    this.#validateString(text, 'Question text must be a string!');
    this.#text = text;
  }

  get choices() {
    return this.#choices;
  }

  #setChoices(choices) {
    if (!Array.isArray(choices)) {
      throw new InvalidQuestionChoiceError('Question choices must be an array of strings!');
    }
    choices.forEach((choice) => {
      this.#validateString(choice, 'Each choice must be a string!');
    });

    this.#choices = choices;
  }

  get correctChoice() {
    return this.#correctChoice;
  }

  #setcorrectChoice(correctChoice) {
    this.#validateString(correctChoice, 'The correct choice must be a string!');
    if (correctChoice.length < 1) throw new RangeError('Correct choice cannot be empty!');
    this.#correctChoice = correctChoice;
  }

  get category() {
    return this.#category;
  }

  #setCategory(categoryName) {
    this.#validateString(categoryName, 'Category must be a string');
    if (categoryName.length < 1) {
      throw new InvalidQuestionCategoryError('The name of the category cannot be empty');
    }
    this.#category = categoryName;
  }

  // eslint-disable-next-line class-methods-use-this
  #validateString(value, errorMessage) {
    if (typeof value !== 'string') throw new TypeError(errorMessage);
  }
}

export default Question;
