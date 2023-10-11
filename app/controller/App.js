import { QuizEngine, QuestionBank } from 'gn222gq-quiz-engine';
import generateChapterQuestions from '../model/questionsGenerator';

class App {
  #quizEngine;

  #introPageController;

  #questionPageController;

  #questionResultPageController;

  #summaryPageController;

  #chartGenerator;

  #feedbackGenerator;

  #cleanCodeChapters;

  #cleanCodeQuestions;

  constructor(factory) {
    this.#introPageController = factory.createIntroPageController();
    this.#questionPageController = factory.createQuestionPageController();
    this.#questionResultPageController = factory.createQuestionResultPageController();
    this.#chartGenerator = factory.createChartGenerator();
    this.#cleanCodeChapters = factory.createCleanCodeChapters();
    this.#summaryPageController = factory.createSummaryPageController(
      this.#chartGenerator,
      this.#cleanCodeChapters,
    );
    this.#feedbackGenerator = factory.createFeedbackGenerator();
    this.#cleanCodeQuestions = factory.createCleanCodeQuestions();
    this.#initQuizEngine();
    this.#initControllers();
  }

  #initQuizEngine() {
    const questionBank = new QuestionBank();
    this.#cleanCodeQuestions.allQuestions.forEach(question => {
      questionBank.addQuestion(question);
    });
    this.#quizEngine = new QuizEngine(questionBank, 'Player');
    this.#quizEngine.randomizeQuestions();

    this.#quizEngine.on('question', (questionData) => {
      this.#questionResultPageController.hideView();
      this.#questionPageController.addQuestionText(questionData.text);
      this.#questionPageController.addAnswerButtons(questionData.choices);
      this.#questionPageController.displayView();
    });

    this.#quizEngine.on('correct', () => {
      this.#questionPageController.hideView();
      this.#questionResultPageController
        .addResultHeaderText(this.#feedbackGenerator.getRandomPositiveFeedbackMessage());
      this.#questionResultPageController.displayView();
    });
    this.#quizEngine.on('false', () => {
      this.#questionPageController.hideView();
      this.#questionResultPageController
        .addResultHeaderText(this.#feedbackGenerator.getRandomNegativeFeedbackMessage());
      this.#questionResultPageController.displayView();
    });
    this.#quizEngine.on('done', async () => {
      this.#questionResultPageController.hideView();
      const quizResult = await this.#quizEngine.getSummary();
      this.#summaryPageController.generateSummary(quizResult.allCategorySummaries);
      this.#summaryPageController.displayView();
    });
  }

  #initControllers() {
    this.#initIntroPageController();
    this.#initQuestionPageController();
    this.#initQuestionResultPageController();
    this.#initSummaryPageController();
  }

  #initIntroPageController() {
    this.#introPageController.on('startQuizButtonClicked', () => {
      this.#quizEngine.startQuiz();
      this.#introPageController.hideView();
    });
  }

  #initQuestionPageController() {
    this.#questionPageController.hideView();
    this.#questionPageController.on('answerButtonPressed', (data) => {
      this.#quizEngine.answerQuestion(data.answer);
    });
  }

  #initQuestionResultPageController() {
    this.#questionResultPageController.hideView();
    this.#questionResultPageController.on('nextQuestionButtonClicked', () => {
      this.#quizEngine.continueQuiz();
    });
  }

  #initSummaryPageController() {
    this.#summaryPageController.hideView();
    this.#summaryPageController.on('restartQuizButtonClicked', () => {
      this.#quizEngine.resetQuiz();
      this.#quizEngine.randomizeQuestions();
      this.#summaryPageController.hideView();
      this.#introPageController.displayView();
    });
  }
}

export default App;
