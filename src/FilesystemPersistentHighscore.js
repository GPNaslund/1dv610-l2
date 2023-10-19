import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import Highscore from './Highscore.js';
// eslint-disable-next-line no-unused-vars
import QuizScore from './QuizScore.js';
import FileTypeError from './errors/FileTypeError.js';
import FileSystemWriteError from './errors/FileSystemWriteError.js';
import FileSystemReadError from './errors/FileSystemReadError.js';


/**
 * Class for reading and writing the quiz highscore to local filesystem.
 */
class FilesystemPersistentHighscore {
  #persistencePath;

  #maxAmountOfScoresToSave;

  /**
   * Initializes the path, if undefined it gets set to a default
   * system path.
   *
   * @param {string} persistencePath - The path to the .json file for saving the data.
   */
  constructor(persistencePath = undefined, maxAmountOfScores = 25) {
    this.#setMaxAmountOfScoresToSave(maxAmountOfScores);
    this.#setPath(persistencePath);
  }

  #setMaxAmountOfScoresToSave(maxAmountOfScores) {
    if (typeof maxAmountOfScores !== 'number') throw TypeError('maxAmountOfScores must be a number');
    if (maxAmountOfScores < 1) throw new RangeError('maxAmountOfScores must be 1 or more');
    this.#maxAmountOfScoresToSave = maxAmountOfScores;
  }

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
  // eslint-disable-next-line class-methods-use-this
  #validatePath(persistencePath) {
    if (typeof persistencePath !== 'string') {
      throw new TypeError('The path must be a string');
    }
    const extensionName = path.extname(persistencePath);
    if (extensionName !== '.json') {
      throw new FileTypeError();
    }
  }

  /**
   * Method for saving a quiz score.
   *
   * @param {QuizScore} quizScore - The quizScore to save.
   */
  async saveQuizScore(quizScore) {
    await this.#filesystemSaveQuizScore(quizScore);
  }

  /**
   * Method for getting the stored highscore data.
   *
   * @returns {Promise<Highscore>} - Promise that resolves to a Highscore object.
   */
  async getHighscore() {
    // eslint-disable-next-line no-return-await
    return await this.#filesystemGetHighscore();
  }

  /**
   * Private method for saving the provided QuizScore to
   * the highscore file.
   *
   * @param {QuizScore} quizScore - The quizScore to save.
   */
  async #filesystemSaveQuizScore(quizScore) {
    try {
      await this.#directoryExistenceValidation(this.#persistencePath);
      await this.#fileExistenceValidation(this.#persistencePath);
      const highscore = await this.#filesystemGetHighscore();
      highscore.addQuizScore(quizScore);
      highscore.sortQuizScores();
      highscore.limitAmountOfScores(this.#maxAmountOfScoresToSave);
      await fs.writeFile(this.#persistencePath, highscore.toJSON());
    } catch (e) {
      throw new FileSystemWriteError();
    }
  }

  /**
   * Private method for reading the file containing the highscores and returning
   * a Highscore object based on that data.
   * @returns {Promise<Highscore>} - Promise resolving to an Highscore object.
   */
  async #filesystemGetHighscore() {
    try {
      await this.#directoryExistenceValidation(this.#persistencePath);
      await this.#fileExistenceValidation(this.#persistencePath);
      const data = await fs.readFile(this.#persistencePath, { encoding: 'utf-8' });
      const highscore = new Highscore();
      highscore.fromJSON(data);
      highscore.sortQuizScores();
      return highscore;
    } catch (e) {
      if (e.code === 'ENOENT') {
        return new Highscore();
      }
      throw new FileSystemReadError();
    }
  }

  /**
   * Private method for validating that the path exists, if not it
   * will create the necessary directories.
   *
   * @param {string} fullPath - The path to the .json file.
   */
  // eslint-disable-next-line class-methods-use-this
  async #directoryExistenceValidation(fullPath) {
    const directory = path.dirname(fullPath);
    try {
      await fs.access(directory);
    } catch (e) {
      if (e.code === 'ENOENT') {
        await fs.mkdir(directory, { recursive: true });
      }
    }
  }

  /**
   * Private method for validating the existence of the highscore .json file,
   * if non existing, the file will be created.
   *
   * @param {string} fullPath - The full path to the .json file.
   */
  // eslint-disable-next-line class-methods-use-this
  async #fileExistenceValidation(fullPath) {
    try {
      await fs.access(fullPath);
    } catch (e) {
      if (e.code === 'ENOENT') {
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
  // eslint-disable-next-line class-methods-use-this
  #getDefaultFilesystemPath() {
    const homeDirectory = os.homedir();
    return path.join(homeDirectory, 'QuizHighscores', 'highscores.json');
  }
}

export default FilesystemPersistentHighscore;
