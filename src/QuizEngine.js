/* eslint-disable no-unused-vars */

import QuestionsManager from './QuestionsManager.js';
import CustomEventEmitter from './CustomEventEmitter.js';
import FilesystemPersistence from './FilesystemPersistentHighscore.js';
import LocalStoragePersistence from './LocalStoragePersistence.js';
import QuizQuestions from './QuizQuestions.js';
import QuizResult from './QuizResult.js';
import QuestionResult from './QuestionResult.js';
import QuizScore from './QuizScore.js';
import Highscore from './Highscore.js';
import QuizResultSummary from './QuizResultSummary.js';
import InvalidQuizQuestionsError from './errors/InvalidQuizQuestionsError.js';
import InvalidPlayerNameError from './errors/InvalidPlayerNameError.js';
import QuizEvents from './QuizEvents.js';

/** Handles the coordination and quiz logic */
class QuizEngine extends CustomEventEmitter {
  #questionsManager;

  #highscorePersistence;

  #quizResult;

  /**
   * Constructs a QuizEngine instance.
   *
   * @param {QuizQuestions} quizQuestions
   * The QuizQuestions instance used to instanciate a QuestionManager.
   */
  constructor(quizQuestions, playerName) {
    super();
    this.#validateQuizQuestions(quizQuestions);
    this.#validatePlayerName(playerName);
    this.#highscorePersistence = null;
    this.#questionsManager = new QuestionsManager(quizQuestions);
    this.#quizResult = new QuizResult(playerName, 0);
  }

  // eslint-disable-next-line class-methods-use-this
  #validateQuizQuestions(quizQuestions) {
    if (!(quizQuestions instanceof QuizQuestions)) {
      throw new InvalidQuizQuestionsError();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #validatePlayerName(playerName) {
    if (typeof playerName !== 'string' || playerName.trim() === '') {
      throw new InvalidPlayerNameError();
    }
  }

  /**
   * Used to initialize a persistent highscore using the local filesystem.
   *
   * @param {string} path - The path to the file. Must be .json extension name.
   */
  initFilesystemStorage(path, maxAmountOfScores = 25) {
    this.#highscorePersistence = new FilesystemPersistence(path, maxAmountOfScores);
  }

  /**
   * Used to initialize a persistent highscore using the local storage of the browser.
   *
   * @param {string} keyName - The key name to use in the broswer local storage for persistence.
   */
  initLocalStorage(keyName, maxAmountOfScores = 25) {
    this.#highscorePersistence = new LocalStoragePersistence(keyName, maxAmountOfScores);
  }

  /**
   * Method used to randomize the order of the questions.
   */
  randomizeQuestions() {
    this.#questionsManager.randomizeQuestions();
  }

  /**
   * Method for starting the quiz.
   * @emits QuizEngine#question
   */
  startQuiz() {
    const firstQuestion = this.#questionsManager.getQuestion();

    /**
     * Question event.
     *
     * @event QuizEngine#question
     * @type {object}
     * @property {string} text - The question text
     * @property {string[]} choices - The questions choices
     */
    this.emit(QuizEvents.QUESTION, { text: firstQuestion.text, choices: firstQuestion.choices });
  }

  /**
   * Method for validating correctness of the users answer to a question.
   * If correct, adds one point and calls the onCorrectAnswer callback.
   * If not correct, calls the onFalse callback.
   *
   * @param {String} answer - The user input.
   * @emits QuizEngine#correct
   * @emits QuizEngine#false
   *
   */
  answerQuestion(answer) {
    const question = this.#questionsManager.getQuestion();
    const questionResult = new QuestionResult(question, answer);
    this.#quizResult.addQuestionResult(questionResult);
    if (questionResult.wasCorrect) {
      this.#quizResult.incrementScore(1);

      /**
       * Correct event
       *
       * @event QuizEngine#correct
       * @type {object}
       * @property {string} playerName - The current player name.
       * @property {number} score - The current players score.
       */
      this.emit(QuizEvents.CORRECT, { playerName: this.#quizResult.playerName, score: this.#quizResult.score });
    } else {
      /**
       * False event
       *
       * @event QuizEngine#false
       * @type {object}
       * @property {string} playerName - The current player name.
       * @property {number} score - The current players score.
       */
      this.emit(QuizEvents.FALSE, { playerName: this.#quizResult.playerName, score: this.#quizResult.score });
    }
  }

  /**
   * Method for checking if quiz is done or not, and if not it calls the onNextQuestion callback.
   *
   * @emits QuizEngine#question
   */
  async continueQuiz() {
    if (this.#questionsManager.hasMoreQuestions()) {
      this.#questionsManager.advanceCurrentIndex();
      const nextQuestion = this.#questionsManager.getQuestion();

      /**
     * Question event.
     *
     * @event QuizEngine#question
     * @type {object}
     * @property {string} text - The question text
     * @property {string[]} choices - The questions choices
     */
      this.emit(QuizEvents.QUESTION, { text: nextQuestion.text, choices: nextQuestion.choices });
    } else {
      await this.#quizDone();
    }
  }

  /**
   * Method for reseting the quiz. Will reset
   * this.#questionsManagers #currentIndex to 0 and re-fetch
   * the questions in its original order. Will also reset the scoreboard score to 0.
   *
   */
  resetQuiz() {
    this.#questionsManager.reset();
    this.#quizResult.reset();
  }

  /**
   * Method for getting the highscore data from persistence class if assigned.
   *
   * @returns {Promise<Highscore>} - A Promise resolving to an object containing the highscore data.
   */
  async getHighScore() {
    if (!this.#highscorePersistence) {
      throw new Error('No highscore persistence initialized');
    }
    // eslint-disable-next-line no-return-await
    return await this.#highscorePersistence.getHighscore();
  }

  /**
   * Method for getting a QuizResultSummary, containing summary data.
   * @returns {Promise<QuizResultSummary>} - A promise that resolves to a QuizResultSummary.
   */
  async getSummary() {
    return this.#quizResult.generateSummary();
  }

  /**
   * Method for checking if there are any more questions available.
   *
   * @returns {boolean} - Indicating if questionsManager has more questions available.
   */
  hasMoreQuestions() {
    return this.#questionsManager.hasMoreQuestions();
  }

  /**
   * Method for finalize the quiz. If highscore persistence is initialized,
   * the final score will be saved to it.
   *
   * @emits QuizEngine#done
   */
  async #quizDone() {
    const { playerName } = this.#quizResult;
    const { score } = this.#quizResult;
    await this.#saveToPersistence(playerName, score);

    /**
     * Done event.
     * @event QuizEngine#done
     * @type {object}
     * @property {string} playerName - The player name.
     * @property {number} score - The player score.
     */
    this.emit(QuizEvents.DONE, { playerName, score });
  }

  /**
   * Method for saving the player name and score to highscore persistence if provided.
   *
   * @param {string} playerName - The player name.
   * @param {number} playerScore - The player score.
   */
  async #saveToPersistence(playerName, playerScore) {
    if (this.#highscorePersistence) {
      await this.#highscorePersistence.saveQuizScore(new QuizScore(playerName, playerScore));
    }
  }
}

export default QuizEngine;
