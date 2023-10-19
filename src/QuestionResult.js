import Question from './Question.js';
import InvalidQuestionError from './errors/InvalidQuestionError.js';
import InvalidQuestionChoiceError from './errors/InvalidQuestionChoiceError.js';

/** Represents the result of an answered question */
class QuestionResult {
  #questionText;

  #questionChoices;

  #correctChoice;

  #selectedChoice;

  #wasCorrect;

  #category;

  /**
   * Creates a QuestionResult object.
   * @param {Question} question
   * @param {string} selectedChoice
   */
  constructor(question, selectedChoice) {
    this.#validatequestionObject(question);
    this.#validateChoice(selectedChoice, question.choices);

    this.#questionText = question.text;
    this.#questionChoices = question.choices;
    this.#correctChoice = question.correctChoice;
    this.#selectedChoice = selectedChoice;
    this.#wasCorrect = question.correctChoice === selectedChoice;
    this.#category = question.category;
  }

  get wasCorrect() {
    return this.#wasCorrect;
  }

  get category() {
    return this.#category;
  }

  // eslint-disable-next-line class-methods-use-this
  #validatequestionObject(question) {
    if (question instanceof Question === false) {
      throw new InvalidQuestionError();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #validateChoice(choice, validChoices) {
    if (typeof choice !== 'string') {
      throw new InvalidQuestionChoiceError('Selected choice must be a string.');
    }
    if (!choice.length) {
      throw new InvalidQuestionChoiceError('Selected choice cannot be empty.');
    }
    if (!validChoices.includes(choice)) {
      throw new InvalidQuestionChoiceError('Selected choice is not a valid option.');
    }
  }
}

export default QuestionResult;
