import Question from "./Question.js";
import QuizQuestions from "./QuizQuestions.js";

/** Class that manages the questions. Ordering, current index and correctness of answer. */
class QuestionsManager {
  #quizQuestions;
  #currentIndex;
  #allQuestions;

  /**
   * Constructs a QuestionManager object.
   * 
   * @param {QuizQuestions} quizQuestionsObject - The question bank containing Questions.
   */
  constructor (quizQuestionsObject) {
    this.#setQuizQuestions(quizQuestionsObject);
    this.#allQuestions = quizQuestionsObject.getAllQuestions();
    this.#currentIndex = 0;
  }

  #setQuizQuestions(quizQuestionsObject) {
    if (quizQuestionsObject instanceof QuizQuestions === false) {
      throw new TypeError("Argument must be an QuizQuestions instance.");
    }
    if (!quizQuestionsObject.hasQuestions()) {
      throw new TypeError("Question bank cannot be empty. Add some questions to the question bank");
    }
    this.#quizQuestions = quizQuestionsObject;
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
   * A method used for randomizing the order of #allQuestions.
   */
  randomizeQuestions() {
    // Fisher-yates shuffle algorithm
    for (let i = this.#allQuestions.length -1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.#allQuestions[i], this.#allQuestions[randomIndex]] = [this.#allQuestions[randomIndex], this.#allQuestions[i]];
    }
  }

  /**
   * Method for resetting the currentIndex and order of #allQuestions.
   */
  reset() {
    this.#currentIndex = 0;
    this.#allQuestions = [...this.#quizQuestions.getAllQuestions()];
  }
  
}

export default QuestionsManager;