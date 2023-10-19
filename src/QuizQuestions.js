import Question from './Question.js';
import InvalidQuestionTypeError from './errors/InvalidQuestionTypeError.js';
import IndexNotNumberError from './errors/IndexNotNumberError.js';
import IndexOutOfBoundsError from './errors/IndexOutOfBoundsError.js';

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
    this.#validateIsQuestion(questionObject);
    this.#allQuestions.push(questionObject);
  }

  #validateIsQuestion(questionObject) {
    if (!(questionObject instanceof Question)) {
      throw new InvalidQuestionTypeError();
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
  createAndAddQuestion({
    text, choices, correctChoice, category = 'undefined',
  }) {
    this.#allQuestions.push(new Question({
      text,
      choices,
      correctChoice,
      category,
    }));
  }

  /**
   * Removes the question at the specified index from #allQuestions.
   *
   * @param {Number} indexOfQuestion
   */
  removeQuestion(indexOfQuestion) {
    this.#validateIndex(indexOfQuestion);
    this.#allQuestions.splice(indexOfQuestion, 1);
  }


  /**
   * Method for returning the Question at a specified index from #allQuestions.
   *
   * @param {Number} index - The index of the Question to return.
   * @returns The Question object at the specified index.
   */
  getQuestion(index) {
    this.#validateIndex(index);
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

  #validateIndex(index) {
    if (typeof index !== 'number') {
      throw new IndexNotNumberError();
    }
    if (index < 0 || index >= this.#allQuestions.length) {
      throw new IndexOutOfBoundsError(this.#allQuestions.length);
    }
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
