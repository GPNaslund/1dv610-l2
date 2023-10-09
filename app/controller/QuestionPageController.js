import CustomEventEmitter from "./CustomEventEmitter.js"

class QuestionPageController extends CustomEventEmitter {
  #questionSection
  #questionText
  #answerButtons

  constructor() {
    super();
    this.#questionSection = document.querySelector("#question-section");
    this.#questionText = document.querySelector("#question-text");
    this.#answerButtons = document.querySelector("#answer-buttons");
    this.#initView();
  }

  #initView() {
    this.#questionSection.classList.add("centered-text");
    this.#answerButtons.classList.add("grid");
  }

  hideView() {
    this.#questionSection.classList.add("hide");
  }

  displayView() {
    this.#questionSection.classList.remove("hide");
  }

  addQuestionText(questionText) {
    this.#questionText.textContent = questionText;
  }

  addAnswerButtons(choices) {
    this.#answerButtons.replaceChildren();
    for (let i = 0; i < choices.length; i++) {
      const answerBtn = document.createElement("div");
      answerBtn.setAttribute("role", "button");
      answerBtn.innerText = choices[i];
      answerBtn.addEventListener("click", () => {
        this.emit("answerButtonPressed", { answer: choices[i] });
      })
      this.#answerButtons.appendChild(answerBtn);
    }
  }

}

export default QuestionPageController;