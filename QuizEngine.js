import QuestionsManager from './QuestionsManager.js';
import Scoreboard from './Scoreboard.js';
import CustomEventEmitter from './CustomEventEmitter.js';
import FilesystemPersistence from './FilesystemPersistence.js';
import LocalStoragePersistence from './LocalStoragePersistence.js';

/** Handles the coordination and quiz logic */
class QuizEngine extends CustomEventEmitter {
  #questionsManager
  #scoreboard;
  #config;
  #highscorePersistence;

  /**
   * Constructs a QuizEngine instance.
   * 
   * @param {QuestionBank} questionBank - The QuestionBank instance used to instanciate a QuestionManager.
   */
  constructor(questionBank, playerName) {
    super();
    this.#highscorePersistence = null;
    this.#questionsManager = new QuestionsManager(questionBank);
    this.#scoreboard = new Scoreboard(playerName);
  }

  initFilesystemStorage(path) {
    this.#highscorePersistence = new FilesystemPersistence(path);
  }

  initLocalStorage(keyName) {
    this.#highscorePersistence = new LocalStoragePersistence(keyName)
  }

  /**
   * Method for starting the quiz.
   * @param {function} [this.#config.callbacks.onQuestion] - Called with the question text and choices as arguments.
   */
  startQuiz() {
    const firstQuestion = this.#questionsManager.getQuestion();
    this.emit("question", {text: firstQuestion.text, choices: firstQuestion.choices});
  }

  /**
   * Method for validating correctness of the users answer to a question.
   * If correct, adds one point and calls the onCorrectAnswer callback.
   * If not correct, calls the onFalse callback.
   * 
   * @param {Number} answer - The user input, an number corresponding to one of the choices of the Question.
   * @param {function} [this.#config.callbacks.onAnswerFeedback] - Used to indicate a false answer.
   */
  answerQuestion(answer) {
    if (this.#questionsManager.isAnswerCorrect(answer)) {
      this.#scoreboard.addPoints(1);
      this.emit('correct', {playerName: this.#scoreboard.playerName, score: this.#scoreboard.score});
    } else {
      this.emit('false', {playerName: this.#scoreboard.playerName, score: this.#scoreboard.score});
    }
  }

  /**
   * Method for checking if quiz is done or not, and if not it calls the onNextQuestion callback.
   * 
   * @param {function} [this.#config.onNextQuestion] - Used to handle the information from the next question.
   * Recieves two arguments, the question text and question choices.
   */
  continueQuiz() {
    if (this.#questionsManager.hasMoreQuestions()) {
      this.#questionsManager.advanceCurrentIndex();
      const nextQuestion = this.#questionsManager.getQuestion();
      this.emit('question', {text: nextQuestion.text, choices: nextQuestion.choices});
    } else {
      this.#quizDone();
    }
  }

  resetQuiz() {
    this.#questionsManager.reset();
    this.#scoreboard.reset();
  }

  getHighScore() {
    if (this.#highscorePersistence) return this.#highscorePersistence.getData();
  }

  hasMoreQuestions() {
    return this.#questionsManager.hasMoreQuestions();
  }

  #quizDone() {
    const playerName = this.#scoreboard.playerName;
    const score = this.#scoreboard.score;
    this.#saveToPersistence(playerName, score);
    this.emit('done', {playerName: playerName, score: score});
  }

  #saveToPersistence(playerName, playerScore) {
    if (this.#highscorePersistence) {
      this.#highscorePersistence.saveData(playerName, playerScore);
    }
  }

}

export default QuizEngine;