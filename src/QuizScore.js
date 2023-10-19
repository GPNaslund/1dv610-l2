import InvalidPlayerNameError from './errors/InvalidPlayerNameError.js';
import InvalidScoreTypeError from './errors/InvalidScoreTypeError.js';

/** Represents data structure for holding userplayerName and score */
class QuizScore {
  #playerName;

  #score;

  /**
   * Constructs an instance of QuizScore.
   *
   * @param {string} playerName - The players name.
   * @param {number} score - The players score.
   */
  constructor(playerName, score) {
    this.#setPlayerName(playerName);
    this.#setScore(score);
  }

  get playerName() {
    return this.#playerName;
  }

  get score() {
    return this.#score;
  }

  #setPlayerName(playerName) {
    this.#validatePlayerName(playerName);
    this.#playerName = playerName;
  }

  // eslint-disable-next-line class-methods-use-this
  #validatePlayerName(playerName) {
    if (typeof playerName !== 'string') {
      throw new InvalidPlayerNameError('Player name must be a string.');
    }
    if (playerName.trim() === '') {
      throw new InvalidPlayerNameError('Player name cannot be empty or just whitespace.');
    }
  }

  #setScore(score) {
    this.#validateScore(score);
    this.#score = score;
  }

  // eslint-disable-next-line class-methods-use-this
  #validateScore(score) {
    if (typeof score !== 'number') {
      throw new InvalidScoreTypeError('Score must be a number.');
    }
    if (!Number.isFinite(score)) {
      throw new InvalidScoreTypeError('Score must be a finite number.');
    }
  }
}

export default QuizScore;
