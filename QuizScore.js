/** Represents data structure for holding username and score */
class QuizScore {
  #name;
  #score;

  constructor(name, score) {
    this.#name = name;
    this.#score = score;
  }

  get name() {
    return this.#name;
  }

  get score() {
    return this.#score;
  }

}

export default QuizScore;