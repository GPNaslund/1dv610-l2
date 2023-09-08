class QuestionsManager {
  #questionBank;
  #currentIndex;
  #allQuestions;

  constructor (questionBankObject) {
    this.#questionBank = questionBankObject;
    this.#allQuestions = questionBankObject.getAllQuestions();
    this.#currentIndex = 0;
  }

  set questionBank(questionBankObject) {
    if (!questionBankObject instanceof QuestionBank) {
      throw new TypeError("Argument must be an QuestionBank instance.");
    }
    if (!questionBankObject.hasQuestions()) {
      throw new TypeError("Question bank cannot be empty. Add some questions to the question bank");
    }
    this.#questionBank = questionBankObject;
  }


  hasMoreQuestions() {
    return this.#currentIndex + 1 < this.#allQuestions.length;
  }

  getFirstQuestion() {
    return this.#allQuestions[0];
  }

  getNextQuestion() {
    if (this.hasMoreQuestions) {
      const question = this.#allQuestions[this.#currentIndex];
      this.#currentIndex++;
      return question;
    }
  }

  isAnswerCorrect(answerInput) {
    const currentQuestion = this.#allQuestions[this.#currentIndex];
    if (typeof answerInput !== "number") {
      throw new TypeError("The index of choice for answerQuestion must be a number.");
    }
    if (answerInput < 0 || answerInput >= currentQuestion.choices.length) {
      throw new RangeError("The index of the choice is out of range.");
    }
    console.log(answerInput);
    return answerInput === currentQuestion.correctChoiceIndex;
  }

  randomizeQuestions() {
    // Fisher-yates shuffle algorithm
    for (let i = this.#allQuestions.length -1; i > this.#allQuestions.length; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.#allQuestions[i], this.#allQuestions[randomIndex]] = [this.#allQuestions[randomIndex], this.#allQuestions[i]];
    }
  }

  reset() {
    this.#currentIndex = 0;
    this.#allQuestions = this.#questionBank.getAllQuestions();
  }
  
}

export default QuestionsManager;