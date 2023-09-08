import Question from "./Question.js";
import Scoreboard from "./ScoreBoard.js";

/** Class representing a QuizEngine */
class QuizEngine {
  #questions;
  #currentQuestionIndex;
  #scoreboard;
  #config

  constructor(playerName, config = {}) {
    this.#questions = [];
    this.#currentQuestionIndex = 0;
    this.#scoreboard = new Scoreboard(playerName);
    this.#config = config;
  }

  addQuestion(questionObject) {
    if (questionObject instanceof Question) {
      this.#questions.push(questionObject);
    } else {
      throw new TypeError("Input for addQuestion method must be an Question object!");
    }
  }

  createAndAddQuestion(questionText, questionAnswers, questionCorrectAnswer) {
    this.#questions.push(new Question(questionText, questionAnswers, questionCorrectAnswer));
  }

  removeQuestion(indexOfQuestion) {
    if (typeof indexOfQuestion !== "number") {
      throw new TypeError("The index of the question to remove must be a number");
    }
    if (indexOfQuestion < 0 || indexOfQuestion > this.#questions.length) {
      if (this.#questions.length === 0) {
        throw new RangeError("There is only one question stored, the index to remove must be 0");
      }
      throw new RangeError("Index is out of bounds. It must be between 0 - " + this.#questions.length + " to remove question.");
    }
    this.#questions.splice(indexOfQuestion, 1);
  }

  startQuiz() {
    if (this.#questions.length === 0) {
      throw new Error("No questions added. Cannot start the quiz.");
    }
    this.#scoreboard.reset();
    this.#currentQuestionIndex = 0;

    if (typeof this.#config.onQuizStart === 'function') {
      this.#config.onQuizStart(this.#questions[this.#currentQuestionIndex].text, this.#questions[this.#currentQuestionIndex].choices);
    }
  }

  answerQuestion(indexOfChoice) {
    if (typeof indexOfChoice !== "number") {
      throw new TypeError("The index of choice for answerQuestion must be a number.");
    }
    const currentQuestion = this.#questions[this.#currentQuestionIndex];

    if (indexOfChoice < 0 || indexOfChoice >= currentQuestion.choices.length) {
      throw new RangeError("The index of the choice is out of range.");
    }

    if (indexOfChoice === currentQuestion.correctChoiceIndex) {
      this.#scoreboard.addPoints(1);
      if (typeof this.#config.onCorrectAnswer === "function") {
        this.#config.onCorrectAnswer(this.#scoreboard.playerName, this.#scoreboard.score);
      }
    } else {
      if (typeof this.#config.onFalseAnswer === "function") {
        this.#config.onFalseAnswer(this.#scoreboard.playerName, this.#scoreboard.score);
      }
    }
  }

  getNextQuestion() {
    if (this.#currentQuestionIndex + 1 === this.choices.length) {
      if (typeof this.#config.onQuizDone === "function") {
        
      }
    }
  }

}

export default QuizEngine;