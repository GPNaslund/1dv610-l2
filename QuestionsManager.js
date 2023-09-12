import Question from "./Question.js";
import QuestionBank from "./QuestionBank.js";

/** Class that manages the questions. Ordering, current index and correctness of answer. */
class QuestionsManager {
  #questionBank;
  #currentIndex;
  #allQuestions;

  /**
   * Constructs a QuestionManager object.
   * 
   * @param {QuestionBank} questionBankObject - The question bank containing Questions.
   */
  constructor (questionBankObject) {
    this.#setQuestionBank(questionBankObject);
    this.#allQuestions = questionBankObject.getAllQuestions();
    this.#currentIndex = 0;
  }

  /**
   * Method that validates the questionBankObject and assigns this.#questionBank if valid.
   *
   * @memberof QuestionsManager
   */
  #setQuestionBank(questionBankObject) {
    if (questionBankObject instanceof QuestionBank === false) {
      throw new TypeError("Argument must be an QuestionBank instance.");
    }
    if (!questionBankObject.hasQuestions()) {
      throw new TypeError("Question bank cannot be empty. Add some questions to the question bank");
    }
    this.#questionBank = questionBankObject;
  }

  /**
   * Method for checking if there is atleast one more question based on the current index.
   * 
   * @returns {boolean} indicating if there are any more questions.
   */
  hasMoreQuestions() {
    return this.#currentIndex + 1 < this.#allQuestions.length;
  }

  /**
   * Method returning the Question at the current index.
   * 
   * @returns {Question} - The Question object at the current index. 
   */
  getQuestion() {
    return this.#allQuestions[this.#currentIndex];
  }

  /**
   * Method for advancing the current index by one if it corresponds
   * with available indexes in #allQuestions.
   * 
   */
  advanceCurrentIndex() {
    if (this.#currentIndex + 1 < this.#allQuestions.length) {
      this.#currentIndex++;
    }
  }
  

  /**
   * Method for checking if the answer input is correct.
   * 
   * @param {Number} answerInput - The user choice, corresponding with one of the choices of the current question.
   * @returns {boolean} - Indicating if the awnserInput is correct or not.
   */
  isAnswerCorrect(answerInput) {
    if (typeof answerInput !== "number") {
      throw new TypeError("The index of choice for answerQuestion must be a number.");
    }

    const currentQuestion = this.#allQuestions[this.#currentIndex];
    
    if (answerInput < 0 || answerInput >= currentQuestion.choices.length) {
      throw new RangeError("The index of the choice is out of range.");
    }

    return answerInput === currentQuestion.correctChoiceIndex;
  }

  /**
   * A method used for randomizing the order of #allQuestions.
   */
  randomizeQuestions() {
    // Fisher-yates shuffle algorithm
    for (let i = this.#allQuestions.length -1; i > this.#allQuestions.length; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.#allQuestions[i], this.#allQuestions[randomIndex]] = [this.#allQuestions[randomIndex], this.#allQuestions[i]];
    }
  }

  /**
   * Method for resetting the currentIndex and order of #allQuestions.
   */
  reset() {
    this.#currentIndex = 0;
    this.#allQuestions = [...this.#questionBank.getAllQuestions()];
  }
  
}

export default QuestionsManager;