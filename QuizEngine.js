import QuestionsManager from "./QuestionsManager.js"; 
import Scoreboard from "./Scoreboard.js";

/** Class representing a QuizEngine */
class QuizEngine {
  #questionManager
  #scoreboard;
  #config

  constructor(questionBank, scoreboard = new Scoreboard("Anynomous"), config = {}) {
    this.#questionManager = new QuestionsManager(questionBank);
    this.#scoreboard = scoreboard;
    this.#config = config;
  }


  startQuiz() {
    this.#questionManager.reset();
    this.#scoreboard.reset();

    if (this.configHasCallbackFunction("onQuizStart")) {
      const firstQuestion = this.#questionManager.getFirstQuestion();
      this.#config.onQuizStart(firstQuestion.text, firstQuestion.choices);
    }
  }

  answerQuestion(answer) {
    if (this.#questionManager.isAnswerCorrect(answer)) {
      this.#scoreboard.addPoints(1);
      if (this.configHasCallbackFunction("onCorrectAnswer")) {
        this.#config.onCorrectAnswer(this.#scoreboard.playerName, this.#scoreboard.score);
      }
    } else {
      if (this.configHasCallbackFunction("onFalseAnswer")) {
        this.#config.onFalseAnswer(this.#scoreboard.playerName, this.#scoreboard.score);
      }
    }
  }

  getNextQuestion() {
    if (!this.#questionManager.hasMoreQuestions) {
      if (this.configHasCallbackFunction("onQuizDone") === "function") {
      }
    } else {
      return this.#questionManager.getNextQuestion();
    }
  }

  configHasCallbackFunction(property) {
    return typeof this.#config[property] === 'function';
  }

}

export default QuizEngine;