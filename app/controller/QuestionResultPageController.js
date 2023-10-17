import CustomEventEmitter from './CustomEventEmitter';

/**
 * Class that controlls the question result part of the view.
 */
class QuestionResultPageController extends CustomEventEmitter {
  #questionResultSection;

  #questionResultHeader;

  #nextQuestionButton;

  constructor() {
    super();
    this.#questionResultSection = document.querySelector('#question-result-section');
    this.#questionResultHeader = document.querySelector('#question-result-header');
    this.#nextQuestionButton = document.querySelector('#next-question-button');
    this.#initView();
  }

  #initView() {
    this.#nextQuestionButton.textContent = 'Next question';
    this.#nextQuestionButton.addEventListener('click', () => {
      this.emit('nextQuestionButtonClicked', {});
    });
  }

  /**
   * Will hide the view elements that is controlled by the controller.
   */
  hideView() {
    this.#questionResultSection.classList.add('hide');
  }

  /**
   * Will display the view elements that is controlled by the controller.
   */
  displayView() {
    this.#questionResultSection.classList.remove('hide');
  }

  /**
   * Adds the provided text to the element that is displaying the result header.
   * @param {String} headerText The text to display.
   */
  addResultHeaderText(headerText) {
    this.#validateHeaderText();
    this.#questionResultHeader.textContent = headerText;
  }

  // eslint-disable-next-line class-methods-use-this
  #validateHeaderText(headerText) {
    if (typeof headerText !== 'string') {
      throw new TypeError('Header text argument must be a string');
    }
  }
}

export default QuestionResultPageController;
