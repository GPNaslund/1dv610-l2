import fs from 'fs/promises';
import path from 'path';
import os from 'os';

/**
 * Class for reading and writing the quiz highscore to local filesystem.
 */
class FilesystemPersistence {
  #persistencePath

  /**
   * Initializes the path, if undefined it gets set to a default 
   * system path.
   * 
   * @param {string} persistencePath - The path to the .json file for saving the data.
   */
  constructor(persistencePath = undefined) {
    this.#setPath(persistencePath);
  }

  /**
   * Method for assigning this.#persistencePath. 
   * 
   * @param {string} persistencePath - The path to validate and assign.
   */
  #setPath(persistencePath) {
    if (!persistencePath) {
      this.#persistencePath = this.#getDefaultFilesystemPath();
    } else {
      this.#validatePath(persistencePath);
      this.#persistencePath = persistencePath;
    }
  }

  /**
   * Method for validating the provided path.
   * 
   * @param {string} persistencePath - The path to validate.
   */
  #validatePath(persistencePath) {
    if (typeof persistencePath !== 'string') {
      throw new TypeError('The path must be a string');
    }
    const extensionName = path.extname(persistencePath);
    if (extensionName !== '.json') {
      throw new Error('File is not a JSON file.');
    }
  }

  /**
   * Method for saving the username and points.
   * 
   * @param {string} username - The username to save.
   * @param {string} points - The points to save associated to the user.
   */
  async saveData(username, points) {
    await this.#fileSystemStorageSaveData(username, points);
  }

  /**
   * Method for getting the stored highscore data.
   * 
   * @returns {Promise<Object>} - Promise that resolves to an object containing the saved scores.
   */

  async getData() {
    return await this.#fileSystemStorageGetData();
  }
  
  /**
   * Private method for saving the provided username and points to 
   * the highscore file.
   * 
   * @param {string} username - The username to save.
   * @param {string} points - The points associated with the username to save.
   */
  async #fileSystemStorageSaveData(username, points) {
    try {
      await this.#directoryExistenceValidation(this.#persistencePath);
      await this.#fileExistenceValidation(this.#persistencePath);
      const data = await this.#fileSystemStorageGetData();
      if (data[username]) {
        data[username].push(points);
      } else {
        data[username] = [points];
      }
      data[username] = data[username].sort((a, b) => b - a);
      const sortedData = this.#sortByPointsDescending(data);

      await fs.writeFile(this.#persistencePath, JSON.stringify(sortedData));
    } catch (e) {
      console.log(e);
      throw new Error("Could not write to file system!");
    }
  }

  /**
   * Private method for reading the file containing the highscores and returning
   * a parsed object from that data.
   * @returns {Promise<Object>} - Promise resolving to object containing the highscore data.
   */
  async #fileSystemStorageGetData() {
    try {
      await this.#directoryExistenceValidation(this.#persistencePath);
      await this.#fileExistenceValidation(this.#persistencePath);
      const data = await fs.readFile(this.#persistencePath, { encoding: "utf-8" });
      return JSON.parse(data);
    } catch (e) {
      if (e.code === "ENOENT") {
        return {};
      }
      console.log(e);
      throw Error("Could not read from filesystem!");
    }
  }

  /**
   * Private method for validating that the path exists, if not it
   * will create the necessary directories.
   * 
   * @param {string} fullPath - The path to the .json file.
   */
  async #directoryExistenceValidation(fullPath) {
    const directory = path.dirname(fullPath);
    try {
      await fs.access(directory);
    } catch (e) {
      if (e.code === "ENOENT") {
        await fs.mkdir(directory, { recursive: true })
      }
    }
  }

  /**
   * Private method for validating the existence of the highscore .json file,
   * if non existing, the file will be created.
   * 
   * @param {string} fullPath - The full path to the .json file.
   */
  async #fileExistenceValidation(fullPath) {
    try {
      await fs.access(fullPath);
    } catch (e) {
      if (e.code === "ENOENT") {
        await fs.writeFile(fullPath, JSON.stringify({}));
      }
    }
  }

  /**
   * Private method for creating a default path to the .json file
   * to save and read highscore data from.
   * 
   * @returns {string} - The default path.
   */
  #getDefaultFilesystemPath() {
    const homeDirectory = os.homedir();
    return path.join(homeDirectory, 'QuizHighscores', 'highscores.json');
  }

  /**
   * Private method for sorting the highscore entries by points descending.
   * @param {Object} highscores - The highscores to sort.
   * @returns {Object} The sorted highscores.
   */
  #sortByPointsDescending(highscores) {
    const highscoresArray = Object.entries(highscores);
    highscoresArray.sort((a, b) => Math.max(...b[1]) - Math.max(...a[1]));
    const highscoresObject = Object.fromEntries(highscoresArray);
    return highscoresObject;
  }

}

export default FilesystemPersistence;