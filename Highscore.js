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
   * Method for adding a QuizScore to #allQuizScores.
   * 
   * @param {QuizScore} newQuizScore - The QuizScore to add.
   */
  addQuizScore(newQuizScore) {
    if (newQuizScore instanceof QuizScore === false) throw TypeError("Argument must be an instance of QuizScore");
    const existingUserIndex = this.#allQuizScores.findIndex(quizScore => quizScore.name === newQuizScore.name);
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
        quizScoresObject[quizScore.name] = quizScore.score;
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
      infoArray.push(`${i + 1}) ${this.#allQuizScores[i].name} : ${this.#allQuizScores[i].score}`)
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

/*
toString() => "1) PlayerName : 10 points, 2) PlayerName : 8 points"
toArray() => ["1) PlayerName : 10 points", "2) PlayerName : 8 points"];
toJson() => { PlayerName: 10, PlayerName: 8 }
fromJson() => [QuizScore(PlayerName, 10), QuizScore(PlayerName 8)]



1) PlayerName : 10 points
2) PlayerName : 8 points

{
  PlayerName: 10
  PlayerName: 8
}

*/