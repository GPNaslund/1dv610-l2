import CustomEventEmitter from './CustomEventEmitter';

/**
 * Class that controlls the question part of the view.
 */
class QuestionPageController extends CustomEventEmitter {
  #questionSection;

  #questionText;

  #answerButtons;

  constructor() {
    super();
    this.#questionSection = document.querySelector('#question-section');
    this.#questionText = document.querySelector('#question-text');
    this.#answerButtons = document.querySelector('#answer-buttons');
    this.#initView();
  }

  #initView() {
    this.#questionSection.classList.add('centered-text');
    this.#questionText.classList.add('preserve-whitespace');
    this.#answerButtons.classList.add('grid');
  }

  /**
   * Will hide the elements controlled by the controller.
   */
  hideView() {
    this.#questionSection.classList.add('hide');
  }

  /**
   * Will display the elements controlled by the controller.
   */
  displayView() {
    this.#questionSection.classList.remove('hide');
  }

  /**
   * Adds the provided text to the element displaying the question text.
   * @param {String} questionText The string to display.
   */
  addQuestionText(questionText) {
    this.#verifyQuestionText(questionText);
    this.#questionText.textContent = questionText;
  }

  /**
   * Will generate answer buttons with functionality tied
   * to clicking the button.¨
   *
   * @param {String[]} choices The choices to the question.
   */
  addAnswerButtons(choices) {
    this.#verifyChoices(choices);
    this.#answerButtons.replaceChildren();
    for (let i = 0; i < choices.length; i += 1) {
      const answerBtn = document.createElement('div');
      answerBtn.setAttribute('role', 'button');
      answerBtn.innerText = choices[i];
      answerBtn.addEventListener('click', () => {
        this.emit('answerButtonPressed', { answer: choices[i] });
      });
      this.#answerButtons.appendChild(answerBtn);
    }
  }

  #verifyQuestionText(questionText) {
    if (typeof questionText !== 'string') {
      throw new TypeError('The question text argument must be a string');
    }
  }

  #verifyChoices(choices) {
    if (!Array.isArray(choices)) {
      throw new TypeError('The choices argument must be an array');
    }
    choices.forEach((choice) => {
      if (typeof choice !== 'string') {
        throw new TypeError('Each entry in the choices argument must be a string');
      }
    });
  }
}

export default QuestionPageController;
