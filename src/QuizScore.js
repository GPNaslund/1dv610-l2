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
    if (!playerName || typeof playerName !== 'string') throw new TypeError('Playername must be a string');
    if (playerName.length < 1) throw new RangeError('playerName cannot be empty.');
    this.#playerName = playerName;
  }

  #setScore(score) {
    if (!score || typeof score !== 'number') throw new TypeError('Score must be a number');
    this.#score = score;
  }
}

export default QuizScore;
