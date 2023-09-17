import QuestionsManager from './QuestionsManager.js';
import CustomEventEmitter from './CustomEventEmitter.js';
import FilesystemPersistence from './FilesystemPersistentHighscore.js';
import LocalStoragePersistence from './LocalStoragePersistence.js';
import QuestionBank from './QuestionBank.js';
import QuizResult from './QuizResult.js';
import QuestionResult from './QuestionResult.js';
import QuizScore from './QuizScore.js';
import Highscore from './Highscore.js';

/** Handles the coordination and quiz logic */
class QuizEngine extends CustomEventEmitter {
  #questionsManager
  #highscorePersistence;
  #quizResult;

  /**
   * Constructs a QuizEngine instance.
   * 
   * @param {QuestionBank} questionBank - The QuestionBank instance used to instanciate a QuestionManager.
   */
  constructor(questionBank, playerName) {
    super();
    this.#highscorePersistence = null;
    this.#questionsManager = new QuestionsManager(questionBank);
    this.#quizResult = new QuizResult(playerName, 0);
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
    this.emit("question", {text: firstQuestion.text, choices: firstQuestion.choices});
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
      this.emit('correct', {playerName: this.#quizResult.playerName, score: this.#quizResult.score});
    } else {
      /**
       * False event
       * 
       * @event QuizEngine#false
       * @type {object}
       * @property {string} playerName - The current player name.
       * @property {number} score - The current players score.
       */
      this.emit('false', {playerName: this.#quizResult.playerName, score: this.#quizResult.score});
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
      this.emit('question', {text: nextQuestion.text, choices: nextQuestion.choices});
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
    if (this.#highscorePersistence) return await this.#highscorePersistence.getHighscore();
  }

  /**
   * Method for getting a QuizResultSummary, containing summary data.
   * @returns 
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
    const playerName = this.#quizResult.playerName;
    const score = this.#quizResult.score;
    await this.#saveToPersistence(playerName, score);

    /**
     * Done event.
     * @event QuizEngine#done
     * @type {object}
     * @property {string} playerName - The player name.
     * @property {number} score - The player score.
     */
    this.emit('done', {playerName: playerName, score: score});
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