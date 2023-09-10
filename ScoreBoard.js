/** Class representing a scoreboard */
class Scoreboard {
  #playerName;
  #score;

  /**
   * Constructs the class.
   * 
   * @param {string} playerName - The players name to keep the score for.
   * @param {number} score - The starting score of the player.
   */
  constructor(playerName, score = 0) {
    this.playerName = playerName;
    this.score = score;
  }

  /**
   * Sets the players name.
   * 
   * @param {string} name - The name to be assigned to the player.
   * @memberof ScoreBoard
   */
  set playerName(name) {
    if (typeof name !== 'string') {
      throw new TypeError("The player name must be a string!");
    }
    if (name.length <= 0) {
      throw new TypeError("The player name cannot be empty!");
    }
    this.#playerName = name;
  }

  /**
   * Gets the players name.
   *
   * @readonly
   * @memberof ScoreBoard
   */
  get playerName() {
    return this.#playerName;
  }

  /**
   * Sets the score for the player.
   * 
   * @param {number} scorePoints
   */
  set score(scorePoints) {
    if (typeof scorePoints !== "number") {
      throw new TypeError("The score must be a number!");
    }
    this.#score = scorePoints;
  }

  /**
   * Gets the score of the player.
   *
   * @readonly
   * @memberof ScoreBoard
   */
  get score() {
    return this.#score;
  }

  /**
   * Method to add points to the score.
   * 
   * @param {number} amountOfPoints 
   */
  addPoints(amountOfPoints) {
    if (typeof amountOfPoints !== "number") {
      throw new TypeError("The amount of points to add to the score must be a number");
    }
    if (amountOfPoints < 1) {
      throw new TypeError("The amount of points to add must be a positive number");
    }
    this.#score += amountOfPoints;
  }

  /**
   * Method for deducting points from the score.
   * 
   * @param {number} amountOfPoints 
   */
  deductPoints(amountOfPoints) {
    if (typeof amountOfPoints !== "number") {
      throw new TypeError("The amount of points to add to the score must be a number");
    }
    if (amountOfPoints < 1) {
      throw new TypeError("The amount of points to be deducted must be a positive number");
    }
    this.#score -= amountOfPoints;
  }

  reset() {
    this.#score = 0;
  }

}

module.exports = Scoreboard;