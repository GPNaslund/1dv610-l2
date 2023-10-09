class IntroPageController {
  #introSection
  #introHeader
  #introParagraph
  #startQuizButton
  #quizEngine
  
  constructor(quizEngine) {
    this.#introSection = document.querySelector("#intro-section");
    this.#introHeader = document.querySelector("#intro-header");
    this.#introParagraph = document.querySelector("#intro-paragraph");
    this.#startQuizButton = document.querySelector("#start-quiz-button");
    this.#initView();
    this.#quizEngine = quizEngine;
  }

  #initView() {
    this.#introSection.classList.add("centered-text");
    this.#introHeader.textContent = "Welcome to the Clean code quiz";
    this.#introParagraph.textContent = `You will be quizzed on questions on chapter 2-11 and get a summary
    to guide your future studying.`;
    this.#startQuizButton.textContent = "Start quiz!";

    this.#startQuizButton.addEventListener("click", () => {
      this.hideView();
      this.#quizEngine.startQuiz();
    })
  }

  hideView() {
    this.#introSection.classList.add("hide");
  }

  displayView() {
    this.#introSection.classList.remove("hide");
  }
}

export default IntroPageController;