import Highscore from "./Highscore.js";
import QuizScore from "./QuizScore.js";

/**
 * Class for saving highscore to local storage in browser.
 */
class LocalStoragePersistence {
  #keyName
  #maxAmountOfScoresToSave

  /**
   * Initializes the keyName field.
   * @param {string} keyName - The name of the key to be used in the local storage.
   */
  constructor(keyName = 'quizHighscores', maxAmountOfScores = 25) {
    this.#setMaxAmountOfScoresToSave(maxAmountOfScores);
    this.#setKeyName(keyName);
  }

  #setMaxAmountOfScoresToSave(maxAmountOfScores) {
    if (typeof maxAmountOfScores !== 'number') throw TypeError('maxAmountOfScores must be a number');
    if (maxAmountOfScores < 1) throw new RangeError("maxAmountOfScores must be 1 or more");
    this.#maxAmountOfScoresToSave = maxAmountOfScores;
  }

  #setKeyName(keyName) {
    if (typeof keyName !== 'string') {
      throw new TypeError('The key name for local storage must be a string');
    }
    if (keyName.length < 1 || keyName.length > 50) {
      throw new RangeError('The key name for local storage must be between 1 - 50 characters long');
    }
    this.#keyName = keyName;
  }

  /**
   * Method for saving a QuizScore to local storage.
   * 
   * @param {QuizScore} quizScore - The quizScore to save. 
   */
  async saveQuizScore(quizScore) {
    Promise.resolve(this.#localStorageSaveQuizScore(quizScore));
  }

  /**
   * Method for getting the Highscore from local storage.
   * @returns {Promise<Highscore>} - A promise that resolves to an object containing the highscore data.
   */
  async getHighscore() {
    return Promise.resolve(this.#localStorageGetHighscore());
  }

  /**
   * Method for saving a QuizScore to local storage.
   * 
   * @param {QuizScore} quizScore - The quizScore to be saved.
   */
  #localStorageSaveQuizScore(quizScore) {
    if (this.#localStorageIsAvailable()) {
      const highscore = this.#localStorageGetHighscore();
      highscore.addQuizScore(quizScore);
      highscore.sortQuizScores();
      highscore.limitAmountOfScores(this.#maxAmountOfScoresToSave);
      localStorage.setItem(this.#keyName, highscore.toJSON());
    } else {
      throw new Error("Local storage is not available for usage");
    }
  }

  /**
   * Method for getting the highscore data from localstorage.
   * 
   * @returns {Highscore} - An object containing the highscore data.
   */
  #localStorageGetHighscore() {
    if (this.#localStorageIsAvailable()) {
      const exisitingHighscores = localStorage.getItem(this.#keyName);
      const highscore = new Highscore();
      highscore.fromJSON(exisitingHighscores);
      highscore.sortQuizScores();
      return highscore;
    } else {
      throw new Error("Local storage is not available for usage");
    }
  }


  /**
   * Method for checking the availability of localstorage.
   * 
   * @returns {boolean} indicating if local storage is avaialable or not.
   */
  #localStorageIsAvailable() {
    if (typeof window === "undefined") {
      return false;
    }
    try {
      window.localStorage.setItem("test", "test");
      window.localStorage.removeItem("test");
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default LocalStoragePersistence;