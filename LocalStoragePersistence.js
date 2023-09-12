/**
 * Class for saving highscore to local storage in browser.
 */
class LocalStoragePersistence {
  #keyName

  /**
   * Initializes the keyName field.
   * @param {string} keyName - The name of the key to be used in the local storage.
   */
  constructor(keyName = 'quizHighscores') {
    this.#setKeyName(keyName);
  }

  /**
   * Private method for validating and assigning the key name used for local storage.
   * 
   * @param {string} keyName - The name of the key to be used with local storage.
   */
  #setKeyName(keyName) {
    if(typeof keyName !== 'string') {
      throw new TypeError('The key name for local storage must be a string');
    }
    if (keyName.length < 1 || keyName.length > 50) {
      throw new RangeError('The key name for local storage must be between 1 - 50 characters long');
    }
    this.#keyName = keyName;
  }

  /**
   * Method for saving the username and points to local storage.
   * 
   * @param {string} username - The username to save. 
   * @param {string} points - The points associated with the user to save.
   */
  async saveData(username, points) {
    Promise.resolve(this.#localStorageSaveData(username, points));
  }

  /**
   * Method for getting the data in local storage.
   * @returns {Promise<Object>} - A promise that resolves to an object containing the highscore data.
   */
  async getData() {
    return Promise.resolve(this.#localStorageGetData());
  }

  /**
   * Method for saving the username and points to local storage.
   * 
   * @param {string} username - The username to be saved.
   * @param {string} points - The points to be saved.
   */
  #localStorageSaveData(username, points) {
    if (this.#localStorageIsAvailable()) {
      const highScores = this.#localStorageGetData();
      highScores[username] = points;
      const sortedHighscores = this.#sortByPointsDescending(highScores);
      localStorage.setItem(this.#keyName, JSON.stringify(sortedHighscores));
    } else {
      throw new Error("Local storage is not available for usage");
    }
  }

  /**
   * Method for getting the highscore data from localstorage.
   * 
   * @returns {Object} - An object containing the highscore data.
   */
  #localStorageGetData() {
    if (this.#localStorageIsAvailable()) {
      const exisitingHighscores = localStorage.getItem(this.#keyName);
      return exisitingHighscores ? JSON.parse(exisitingHighscores) : {};
    } else {
      throw new Error("Local storage is not available for usage");
    }
  }

  /**
   * Method for sorting the highscore by points descending.
   * 
   * @param {Object} highscore - The object containing highscore data.
   * @returns {Object} - An object containing the highscore data sorted by points.
   */
  #sortByPointsDescending(highscore) {
    const highscoreArray = Object.entries(highscore);
    highscoreArray.sort((a, b) => Math.max(...b[1]) - Math.max(...a[1]));
    const highscoreObject = Object.fromEntries(highscoreArray);
    return highscoreObject;
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