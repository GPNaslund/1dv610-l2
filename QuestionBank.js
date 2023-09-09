const Question = require('./Question.js');

/** 
 * Class responsible for creating/adding questions, storing questions and 
 * utility for randomizing the order of the questions.
 */
class QuestionBank {
  #allQuestions;

  /**
   * Creates a QuestionBank instance.
   */
  constructor() {
    this.#allQuestions = [];
  }

  /**
   * Method used for adding a pre composed Question object to #allQuestions field.
   * @param {Question} questionObject - The precomposed Question object.
   */
  addQuestion(questionObject) {
    if (questionObject instanceof Question) {
      this.#allQuestions.push(questionObject);
    } else {
      throw new TypeError("Input for addQuestion method must be an Question object!");
    }
  }


  /**
   * Creates a Question and adds the instance to #allQuestions.
   * @param {String} questionText - The questions text.
   * @param {String} questionAnswers - The possible awnsers.
   * @param {Number} questionCorrectAnswer - A number corresponding with the correct awnsers index in questionsAnswer.
   */
  createAndAddQuestion(questionText, questionAnswers, questionCorrectAnswer) {
    this.#allQuestions.push(new Question(questionText, questionAnswers, questionCorrectAnswer));
  }

  /**
   * Removes the question at the specified index from #allQuestions.
   * @param {Number} indexOfQuestion 
   */
  removeQuestion(indexOfQuestion) {
    if (typeof indexOfQuestion !== "number") {
      throw new TypeError("The index of the question to remove must be a number");
    }
    if (indexOfQuestion < 0 || indexOfQuestion > this.#allQuestions.length) {
      if (this.#allQuestions.length === 0) {
        throw new RangeError("There is only one question stored, the index to remove must be 0");
      }
      throw new RangeError("Index is out of bounds. It must be between 0 - " + this.#allQuestions.length + " to remove question.");
    }
    this.#allQuestions.splice(indexOfQuestion, 1);
  }

  /**
   * Method for returning the Question at a specified index from #allQuestions.
   * 
   * @param {Number} index - The index of the Question to return.
   * @returns The Question object at the specified index.
   */
  getQuestion(index) {
   if (typeof index !== "number") {
    throw new TypeError("Index must be a number");
   }
   if (index < 0 || index > this.#allQuestions.length - 1) {
    throw new RangeError("Index out of range. Must be between 0 - " + this.#allQuestions.length - 1 + ".");
   }
   return this.#allQuestions[index];
  }
  
  /**
   * Method for getting all the Questions in #allQuestions.
   * @returns - An array containing all the stored Questions in #allQuestions.
   */
  getAllQuestions() {
    return this.#allQuestions;
  }

  /**
   * Method for checking if there are any stored Questions in #allQuestions.
   * @returns boolean value indicating if there are any Questions in #allQuestions list.
   */
  hasQuestions() {
    return this.#allQuestions.length > 0;
  }

}

module.exports = QuestionBank;