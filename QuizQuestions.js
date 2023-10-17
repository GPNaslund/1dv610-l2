import Question from './Question.js';

/**
 * Class responsible for creating/adding questions, storing questions, and 
 * utility for randomizing the order of the questions.
 */
class QuizQuestions {
  #allQuestions;

  /**
   * Creates a QuizQuestions instance.
   */
  constructor() {
    this.#allQuestions = [];
  }

  /**
   * Method used for adding a precomposed Question object to #allQuestions field.
   * 
   * @param {Question} questionObject - The precomposed Question object.
   */
  addQuestion(questionObject) {
    if (questionObject instanceof Question) {
      this.#allQuestions.push(questionObject);
    } else {
      throw new TypeError("Input for addQuestion method must be a Question object!");
    }
  }

  /**
   * Creates a Question object and adds the instance to #allQuestions.
   * 
   * @param {Object} arguments - The object containing the arguments.
   * @param {String} arguments.text - The question's text.
   * @param {string[]} arguments.choices - The possible answers.
   * @param {string} arguments.correctChoice - The correct choice.
   * @param {string} [arguments.category] - The category of the question.
   */
  createAndAddQuestion({ text, choices, correctChoice, category = 'undefined' }) {
    this.#allQuestions.push(new Question({
      text,
      choices,
      correctChoice,
      category
    }));
  }

  /**
   * Removes the question at the specified index from #allQuestions.
   * 
   * @param {Number} indexOfQuestion 
   */
  removeQuestion(indexOfQuestion) {
    if (typeof indexOfQuestion !== "number") {
      throw new TypeError("The index of the question to remove must be a number");
    }
    if (indexOfQuestion < 0 || indexOfQuestion >= this.#allQuestions.length) {
      throw new RangeError(`Index is out of bounds. It must be between 0 - ${this.#allQuestions.length - 1} to remove a question.`);
    }
    this.#allQuestions.splice(indexOfQuestion, 1);
  }

  /**
   * Method for returning the Question at a specified index from #allQuestions.
   * 
   * @param {Number} index - The index of the Question to return.
   * @returns The Question object at the specified index.
   */
  getQuestion(index) {
    if (typeof index !== "number") {
      throw new TypeError("Index must be a number");
    }
    if (index < 0 || index >= this.#allQuestions.length) {
      throw new RangeError(`Index out of range. Must be between 0 - ${this.#allQuestions.length - 1}.`);
    }
    return this.#allQuestions[index];
  }

  /**
   * Method for getting all the Questions in #allQuestions.
   * 
   * @returns - An array containing all the stored Questions in #allQuestions.
   */
  getAllQuestions() {
    return this.#allQuestions;
  }

  /**
   * Method for checking if there are any stored Questions in #allQuestions.
   * 
   * @returns boolean value indicating if there are any Questions in #allQuestions list.
   */
  hasQuestions() {
    return this.#allQuestions.length > 0;
  }
}

export default QuizQuestions;