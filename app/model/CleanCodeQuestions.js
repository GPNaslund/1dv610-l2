import { Question } from 'gn222gq-quiz-engine';
/**
 * Class that holds and constructs all the questions for the quiz.
 */
class CleanCodeQuestions {
  #allQuestions;

  /**
   * Creates a new instance.
   *
   * @param {JSON} questionDataJson The file containing all
   *                                the question data. Check README for format.
   */
  constructor(questionDataJson) {
    this.#validateQuestionData(questionDataJson);
    this.#allQuestions = [];
    this.#loadQuestions(questionDataJson);
  }

  #loadQuestions(questionDataJson) {
    questionDataJson.questions.forEach((question) => {
      this.#allQuestions.push(
        new Question({
          text: question.text,
          choices: question.choices,
          correctChoice: question.correctChoice,
          category: question.category,
        }),
      );
    });
  }

  get allQuestions() {
    return this.#allQuestions;
  }

  // eslint-disable-next-line class-methods-use-this
  #validateQuestionData(questionDataJson) {
    if (typeof questionDataJson !== 'object' || !questionDataJson.questions) {
      throw new TypeError('questionDataJson must be an object with a questions property');
    }
    if (!Array.isArray(questionDataJson.questions)) {
      throw new TypeError('questions property in questionDataJson must be an array');
    }
    questionDataJson.questions.forEach((question, index) => {
      if (typeof question.text !== 'string') {
        throw new TypeError(`Question at index ${index} must have a text property of type string`);
      }

      if (!Array.isArray(question.choices) || !question.choices.every((choice) => typeof choice === 'string')) {
        throw new TypeError(`Question at index ${index} must have a choices property which is an array of strings`);
      }

      if (typeof question.correctChoice !== 'string' || !question.choices.includes(question.correctChoice)
      ) {
        throw new TypeError(`Question at index ${index} must have a correctChoice property which matches one of the choices`);
      }

      if (typeof question.category !== 'string') {
        throw new TypeError(`Question at index ${index} must have a category property of type string`);
      }
    });
  }
}

export default CleanCodeQuestions;
