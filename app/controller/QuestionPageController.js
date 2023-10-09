class QuestionPageController {
  #questionSection
  #questionText
  #answerButtons
  #quizEngine

  constructor(quizEngine) {
    this.#questionSection = document.querySelector("#question-section");
    this.#questionText = document.querySelector("#question-text");
    this.#answerButtons = document.querySelector("#answer-buttons");
    this.#quizEngine = quizEngine;
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
      answerBtn.innerText = questionData.choices[i];
      answerBtn.addEventListener("click", () => {
        this.#quizEngine.answerQuestion(questionData.choices[i]);
      })
      this.#answerButtons.appendChild(answerBtn);
    }
  }

}

export default QuestionPageController;