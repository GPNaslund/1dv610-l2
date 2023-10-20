import { Question } from 'gn222gq-quiz-engine';

/**
 * Logger class used for requirement testing.
 */
class DevLogger { 
  #isDevMode
  #allQuestionData

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
    const question = this.#allQuestionData.find(q => {
      q.text === questionText;
    });
    if (question) {
      console.log(`text: ${question.text}, choices: ${question.choices}, 
      correctChoice: ${question.correctChoice}, category: ${question.category}`)
    }
  }

  logQuizSummary(quizSummary) {
    const summaryInfo = quizSummary.toArray();
    console.log("==== SUMMARY =====");
    summaryInfo.forEach(string => {
      console.log(string);
    })
  }
}

export default DevLogger;