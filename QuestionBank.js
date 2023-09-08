import Question from './Question.js'

/** 
 * Class responsible for creating/adding questions, storing questions and 
 * utility for randomizing the order of the questions.
 */
class QuestionBank {
  #allQuestions;

  constructor() {
    this.#allQuestions = [];
  }

  addQuestion(questionObject) {
    if (questionObject instanceof Question) {
      this.#allQuestions.push(questionObject);
    } else {
      throw new TypeError("Input for addQuestion method must be an Question object!");
    }
  }

  createAndAddQuestion(questionText, questionAnswers, questionCorrectAnswer) {
    this.#allQuestions.push(new Question(questionText, questionAnswers, questionCorrectAnswer));
  }

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

  

  getQuestion(index) {
   if (typeof index !== "number") {
    throw new TypeError("Index must be a number");
   }
   if (index < 0 || index > this.#allQuestions.length - 1) {
    throw new RangeError("Index out of range. Must be between 0 - " + this.#allQuestions.length - 1 + ".");
   }
   return this.#allQuestions[index];
  }

  getAllQuestions() {
    return this.#allQuestions;
  }

  hasQuestions() {
    return this.#allQuestions.size > 0;
  }

}

export default QuestionBank;