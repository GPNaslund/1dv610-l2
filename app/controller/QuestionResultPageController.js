import CustomEventEmitter from "./CustomEventEmitter.js"

class QuestionResultPageController extends CustomEventEmitter {
  #questionResultSection
  #questionResultHeader
  #nextQuestionButton

  constructor() {
    super();
    this.#questionResultSection = document.querySelector("#question-result-section");
    this.#questionResultHeader = document.querySelector("#question-result-header");
    this.#nextQuestionButton = document.querySelector("#next-question-button");
    this.#initView();
  }

  #initView() {
    this.#nextQuestionButton.textContent = "Next question";
    this.#nextQuestionButton.addEventListener("click", () => {
      this.emit("nextQuestionButtonClicked", {});
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