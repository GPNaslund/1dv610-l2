import { Question } from 'gn222gq-quiz-engine';
import InvalidQuestionDataError from './errors/InvalidQuestionDataError.js';
import QuestionFormatError from './errors/QuestionFormatError.js';

/**
 * Class that holds and constructs all the questions for the quiz.
 */
class CleanCodeQuestions {
  #allQuestions;

  /**
   * Creates a new instance.
   *
   * @param {JSON} questionDataJson The file containing all
   *                                the question data.
   * Should be in this format : { "questions": [{ "text": "example", 
   * "choices": ["test", "test2, etc.."], 
   * "correctChoice": "test", "category": "example"}, etc..]}
   */
  constructor(questionDataJson) {
    this.#validateQuestionDataStructure(questionDataJson);
    this.#allQuestions = [];
    this.#loadQuestions(questionDataJson);
  }

  #loadQuestions(questionDataJson) {
    questionDataJson.questions.forEach((question, index) => {
      this.#validateIndividualQuestion(question, index);
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
  #validateQuestionDataStructure(questionDataJson) {
    if (typeof questionDataJson !== 'object' || !questionDataJson.questions) {
      throw new InvalidQuestionDataError('questionDataJson must be an object with a questions property');
    }
    if (!Array.isArray(questionDataJson.questions)) {
      throw new InvalidQuestionDataError('questions property in questionDataJson must be an array');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #validateIndividualQuestion(question, index) {
    if (typeof question.text !== 'string') {
      throw new QuestionFormatError(index, 'Text property must be a string.');
    }

    if (!Array.isArray(question.choices) || !question.choices.every((choice) => typeof choice === 'string')) {
      throw new QuestionFormatError(index, 'Choices property must be an array of strings.');
    }

    if (typeof question.correctChoice !== 'string' || !question.choices.includes(question.correctChoice)) {
      throw new QuestionFormatError(index, 'CorrectChoice property must match one of the choices.');
    }

    if (typeof question.category !== 'string') {
      throw new QuestionFormatError(index, 'Category property must be a string.');
    }
  }
}

export default CleanCodeQuestions;
