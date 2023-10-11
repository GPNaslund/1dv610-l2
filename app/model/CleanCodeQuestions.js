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
}

export default CleanCodeQuestions;
