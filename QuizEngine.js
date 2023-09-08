import QuestionsManager from "./QuestionsManager.js"; 
import Scoreboard from "./Scoreboard.js";

/** Handles the coordination and quiz logic */
class QuizEngine {
  #questionManager
  #scoreboard;
  #config

  /**
   * Constructs a QuizEngine instance.
   * 
   * @param {QuestionBank} questionBank - The QuestionBank instance used to instanciate a QuestionManager.
   * @param {Scoreboard} scoreboard - The Scoreboard instance used to keep the player name and score.
   * @param {Object} config - An object containing various configuartion properties.
   */
  constructor(questionBank, scoreboard = new Scoreboard("Anynomous"), config = {}) {
    this.#questionManager = new QuestionsManager(questionBank);
    this.#scoreboard = scoreboard;
    this.#config = config;
  }

  /**
   * Method for starting the quiz.
   * @param {function} [this.#config.onQuizStart] - used to act on the first questions text and choices. 
   * Recieves two arguments, the question text and question choices.
   */
  startQuiz() {
    this.#questionManager.reset();
    this.#scoreboard.reset();

    if (this.configHasCallbackFunction("onQuizStart")) {
      const firstQuestion = this.#questionManager.getFirstQuestion();
      this.#config.onQuizStart(firstQuestion.text, firstQuestion.choices);
    }
  }

  /**
   * Method for validating correctness of the users answer to a question.
   * If correct, adds one point and calls the onCorrectAnswer callback.
   * If not correct, calls the onFalse callback.
   * 
   * @param {Number} answer - The user input, an number corresponding to one of the choices of the Question.
   * @param {function} [this.#config.onCorrectAnswer] - Used to indicate a correct anwser. 
   * @param {function} [this.#config.onCorrectAnswer] - Used to indiicate a false answer.
   */
  answerQuestion(answer) {
    if (this.#questionManager.isAnswerCorrect(answer)) {
      this.#scoreboard.addPoints(1);
      if (this.configHasCallbackFunction("onCorrectAnswer")) {
        this.#config.onCorrectAnswer();
      }
    } else {
      if (this.configHasCallbackFunction("onFalseAnswer")) {
        this.#config.onFalseAnswer();
      }
    }
  }

  /**
   * Method for checking if quiz is done or not, and if not it calls the onNextQuestion callback.
   * 
   * @param {function} [this.#config.onNextQuestion] - Used to handle the information from the next question.
   * Recieves two arguments, the question text and question choices.
   */
  nextQuestion() {
    if (!this.#questionManager.hasMoreQuestions()) {
      if (this.configHasCallbackFunction("onQuizDone")) {
        this.#config.onQuizDone();
      }
    } else {
      if (this.configHasCallbackFunction("onNextQuestion")) {
        const nextQuestion = this.#questionManager.getNextQuestion();
        this.#config.onNextQuestion(nextQuestion.text, nextQuestion.choices);
      }
    }
  }

  /**
   * Method for checking if a named callback function is provided.
   * 
   * @param {String} property - The name of the callback property.
   * @returns {boolean} Indicating if this.#config contains the named callback function.
   */
  configHasCallbackFunction(property) {
    return typeof this.#config[property] === 'function';
  }

}

export default QuizEngine;