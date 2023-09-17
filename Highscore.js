import QuizScore from "./QuizScore.js";

/** Represents a Highscore */
class Highscore {
  #allQuizScores;

  /**
   * Creates a Highscore object.
   */
  constructor() {
    this.#allQuizScores = [];
  }

  /**
   * Method for adding a QuizScore to #allQuizScores. Will check for existing score with the same name, and
   * keep the higher of the two if there allready is one stored.
   * 
   * @param {QuizScore} newQuizScore - The QuizScore to add.
   */
  addQuizScore(newQuizScore) {
    if (newQuizScore instanceof QuizScore === false) throw TypeError("Argument must be an instance of QuizScore");
    const existingUserIndex = this.#allQuizScores.findIndex(quizScore => quizScore.playerName === newQuizScore.playerName);
    if (existingUserIndex === -1) {
      this.#allQuizScores.push(newQuizScore);
    } else {
      if(this.#allQuizScores[existingUserIndex].score < newQuizScore.score) {
        this.#allQuizScores[existingUserIndex] = newQuizScore;
      }
    }
  }

  /**
   * Sorts the #allQuizScores array by points descending.
   */
  sortQuizScores() {
    this.#allQuizScores.sort((a, b) => b.score - a.score);
  }

  /**
   * Limits the amount of saved scores in the #allQuizScores field.
   * 
   * @param {number} maxAmountOfScores - The maximum amount of scores to save in the highscore.
   */
  limitAmountOfScores(maxAmountOfScores) {
    if (this.#allQuizScores.length > maxAmountOfScores) {
      this.#allQuizScores = this.#allQuizScores.slice(0, maxAmountOfScores);
    }
  }

  /**
   * Creates and adds QuizScores to #allQuizScores from a 
   * JSON string with the format : { playerName: points, playerName: points}.
   * 
   * @param {string} jsonString - The JSON string to be parsed and used to create QuizScores from.
   */
  fromJSON(jsonString) {
    const highscoreObject = JSON.parse(jsonString);
    for(const player in highscoreObject) {
      this.#allQuizScores.push(new QuizScore(player, highscoreObject[player]))
    }
  }

  /**
   * Creates a JSON string from all the stored QuizScores in #allQuizScores.
   * 
   * @returns {string} - JSON string containing all the QuizScore data.
   */
  toJSON() {
    if(this.#allQuizScores.length > 0) {
      const quizScoresObject = {};
      this.#allQuizScores.forEach((quizScore) => {
        quizScoresObject[quizScore.playerName] = quizScore.score;
      })
      return JSON.stringify(quizScoresObject);
    }
    return '';
  }

  /**
   * Returns an array containing the QuizScore data.
   * Ex; ["1) playerName : 10", "2) playerName : 8"]
   * 
   * @returns {Array<string>} - An array containing each QuizScore with a number notation.
   */
  toArray() {
    const infoArray = [];
    for (let i = 0; i < this.#allQuizScores.length; i++) {
      infoArray.push(`${i + 1}) ${this.#allQuizScores[i].playerName} : ${this.#allQuizScores[i].score}`)
    }
    return infoArray;
  }

  /**
   * Returns a string representation of all the QuizScores.
   * Ex; "1) playerName : 10, 2) playerName : 8"
   * 
   * @returns {string} - The string containing the QuizScores.
   */
  toString() {
    return this.toArray().join(', ');
  }
}

export default Highscore;

