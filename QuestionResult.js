import Question from "./Question.js";

/** Represents the result of an answered question */
class QuestionResult {
  #questionText;
  #questionChoices;
  #correctChoice;
  #selectedChoice;
  #wasCorrect;
  #category

  /**
   * Creates a QuestionResult object.
   * @param {Question} question 
   * @param {string} selectedChoice 
   */
  constructor(question, selectedChoice) {
    this.#validatequestionObject(question);
    this.#validateSelectedChoice(selectedChoice);

    this.#questionText = question.text;
    this.#questionChoices = question.choices;
    this.#correctChoice = question.correctChoice;
    this.#selectedChoice = selectedChoice;
    this.#wasCorrect = question.correctChoice === selectedChoice;
    this.#category = question.category;
  }

  /**
   * Getter for #wasCorrect.
   *
   * @readonly
   * @memberof QuestionResult
   */
  get wasCorrect() {
    return this.#wasCorrect;
  }

  /**
   * Getter for #category
   *
   * @readonly
   * @memberof QuestionResult
   */
  get category() {
    return this.#category;
  }

  /**
   * Validates that the passed argument is an instanceof Question.
   * 
   * @param {*} question - The argument to validate.
   */
  #validatequestionObject(question) {
    if (question instanceof Question === false) {
      throw new TypeError("Argument must be of type Question");
    }
  }

  /**
   * Validates that the passed argument is a string that is not empty.
   * 
   * @param {*} selectedChoice - The argument to validate.
   */
  #validateSelectedChoice(selectedChoice) {
    if (typeof selectedChoice !== "string") {
      throw new TypeError("Selected choice must be a string");
    }
    if (selectedChoice.length < 1) {
      throw new TypeError("Selected choice cannot be empty");
    }
  }
}

export default QuestionResult;