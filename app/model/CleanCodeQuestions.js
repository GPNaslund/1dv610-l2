import { Question } from 'gn222gq-quiz-engine';

// eslint-disable-next-line no-unused-vars
class CleanCodeQuestions {
  #allQuestions;

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
