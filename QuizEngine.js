import QuestionsManager from './QuestionsManager.js';
import Scoreboard from './Scoreboard.js';
import CustomEventEmitter from './CustomEventEmitter.js';
import FilesystemPersistence from './FilesystemPersistence.js';
import LocalStoragePersistence from './LocalStoragePersistence.js';
import QuestionBank from './QuestionBank.js';
import QuizResult from './QuizResult.js';

/** Handles the coordination and quiz logic */
class QuizEngine extends CustomEventEmitter {
  #questionsManager
  #scoreboard;
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
    this.#scoreboard = new Scoreboard(playerName);
    this.#quizResult = new QuizResult(playerName, 0);
  }

  initFilesystemStorage(path) {
    this.#highscorePersistence = new FilesystemPersistence(path);
  }

  initLocalStorage(keyName) {
    this.#highscorePersistence = new LocalStoragePersistence(keyName)
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
   * @param {Number} answer - The user input, an number corresponding to one of the choices of the Question.
   * @emits QuizEngine#correct
   * @emits QuizEngine#false
   * 
   */
  answerQuestion(answer) {
    const correctAnswer =this.#questionsManager.isAnswerCorrect(answer);
    const currentQuestion = this.#questionsManager.getQuestion();
    const resultDetails = {
      questionText: currentQuestion.text,
      questionChoices: currentQuestion.choices,
      correctChoice: currentQuestion.choices[currentQuestion.correctChoiceIndex],
      selectedChoice: currentQuestion.choices[answer],
      wasCorrect: correctAnswer,
      category: currentQuestion.category
    }
    this.#quizResult.addQuestionResult(resultDetails);
    if (correctAnswer) {
      this.#scoreboard.addPoints(1);
      this.#quizResult.incrementScore(1);

      /**
       * Correct event
       * 
       * @event QuizEngine#correct
       * @type {object}
       * @property {string} playerName - The current player name.
       * @property {number} score - The current players score.
       */
      this.emit('correct', {playerName: this.#scoreboard.playerName, score: this.#scoreboard.score});
    } else {
      /**
       * False event
       * 
       * @event QuizEngine#false
       * @type {object}
       * @property {string} playerName - The current player name.
       * @property {number} score - The current players score.
       */
      this.emit('false', {playerName: this.#scoreboard.playerName, score: this.#scoreboard.score});
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
    this.#scoreboard.reset();
  }

  /**
   * Method for getting the highscore data from persistence class if assigned.
   * 
   * @returns {Promise<Object>} - A Promise resolving to an object containing the highscore data.
   */
  async getHighScore() {
    if (this.#highscorePersistence) return await this.#highscorePersistence.getData();
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
    const playerName = this.#scoreboard.playerName;
    const score = this.#scoreboard.score;
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
     await this.#highscorePersistence.saveData(playerName, playerScore);
    }
  }

}

export default QuizEngine;