// eslint-disable-next-line no-unused-vars
import { Question } from 'gn222gq-quiz-engine';

/**
 * Logger class used for development and testing purposes.
 */
class DevLogger {
  #isDevMode;

  #allQuestionData;

  constructor(isDevMode) {
    this.#isDevMode = isDevMode;
    this.#allQuestionData = [];
  }

  /**
   * Method for adding a question to #allQuestionData.
   *
   * @param {Question} question The question to add.
   */
  addQuestion(question) {
    this.#allQuestionData.push(question);
  }

  /**
   * Method for console logging the details of a question.
   *
   * @param {String} questionText The question text to match with stored questions.
   */
  logQuestionDetails(questionText) {
    if (this.#isDevMode) {
      const question = this.#allQuestionData.find((q) => q.text === questionText);
      if (question) {
        // eslint-disable-next-line no-console
        console.log(`text: ${question.text}, choices: ${question.choices}, 
        correctChoice: ${question.correctChoice}, category: ${question.category}`);
      }
    }
  }

  logQuizSummary(quizSummary) {
    if (this.#isDevMode) {
      const summaryInfo = quizSummary.toArray();
      // eslint-disable-next-line no-console
      console.log('==== SUMMARY =====');
      summaryInfo.forEach((string) => {
        // eslint-disable-next-line no-console
        console.log(string);
      });
    }
  }
}

export default DevLogger;
