class QuestionResultPageController {
  #questionResultSection
  #questionResultHeader
  #nextQuestionButton
  #quizEngine;

  constructor(quizEngine) {
    this.#questionResultSection = document.querySelector("#question-result-section");
    this.#questionResultHeader = document.querySelector("#question-result-header");
    this.#nextQuestionButton = document.querySelector("#next-question-button");
    this.#quizEngine = quizEngine;
    this.#initView();
  }

  #initView() {
    this.#nextQuestionButton.textContent = "Next question";
    this.#nextQuestionButton.addEventListener("click", () => {
      this.#quizEngine.continueQuiz();
    })
  }

  hideView() {
    this.#questionResultSection.classList.add("hide");
  }

  displayView() {
    this.#questionResultSection.classList.remove("hide");
  }

  addResultHeaderText(headerText) {
    this.#questionResultHeader.textContent = headerText;
  }
}

export default QuestionResultPageController;