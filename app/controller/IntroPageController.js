import CustomEventEmitter from './CustomEventEmitter';

/**
 * Class that controlls the intro page part of the view.
 */
class IntroPageController extends CustomEventEmitter {
  #introSection;

  #introHeader;

  #introParagraph;

  #startQuizButton;

  constructor() {
    super();
    this.#introSection = document.querySelector('#intro-section');
    this.#introHeader = document.querySelector('#intro-header');
    this.#introParagraph = document.querySelector('#intro-paragraph');
    this.#startQuizButton = document.querySelector('#start-quiz-button');
    this.#initView();
  }

  #initView() {
    this.#introSection.classList.add('centered-text');
    this.#introHeader.textContent = 'Welcome to the Clean code quiz';
    this.#introParagraph.textContent = `You will be quizzed on questions on chapter 2-11 and get a summary
    to guide your future studying.`;
    this.#startQuizButton.textContent = 'Start quiz!';

    this.#startQuizButton.addEventListener('click', () => {
      this.emit('startQuizButtonClicked', {});
    });
  }

  /**
   * Will hide the view elements controlled by the controller.
   */
  hideView() {
    this.#introSection.classList.add('hide');
  }

  /**
   * Will display the view elements controlled by the controller.
   */
  displayView() {
    this.#introSection.classList.remove('hide');
  }
}

export default IntroPageController;
