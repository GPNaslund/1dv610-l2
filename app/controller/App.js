import { QuizEngine, QuizQuestions, QuizEvents } from 'gn222gq-quiz-engine';
// eslint-disable-next-line no-unused-vars
import AppFactory from './AppFactory';
import AppFactoryError from './errors/AppFactoryError';

/**
 * The main class for wiring the components together.
 */
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

  /**
   * Constructs a new instance.
   *
   * @param {AppFactory} factory The factory instance used to create the necessary dependencies.
   */
  constructor(factory) {
    this.#verifyArguments(factory);
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
    this.#quizEngine = new QuizEngine(this.#initQuizQuestions(), 'Player');
    this.#quizEngine.randomizeQuestions();
    this.#addQuizEngineEventHandlers();
  }

  #initQuizQuestions() {
    const quizQuestions = new QuizQuestions();
    this.#cleanCodeQuestions.allQuestions.forEach((question) => {
      quizQuestions.addQuestion(question);
    });
    return quizQuestions;
  }

  #addQuizEngineEventHandlers() {
    this.#addQuizEngineOnQuestionEvent();
    this.#addQuizEngineOnCorrectEvent();
    this.#addQuizEngineOnFalseEvent();
    this.#addQuizEngineOnDoneEvent();
  }

  #addQuizEngineOnQuestionEvent() {
    this.#quizEngine.on(QuizEvents.QUESTION, (questionData) => {
      this.#questionResultPageController.hideView();
      this.#questionPageController.addQuestionText(questionData.text);
      this.#questionPageController.addAnswerButtons(questionData.choices);
      this.#questionPageController.displayView();
    });
  }

  #addQuizEngineOnCorrectEvent() {
    this.#quizEngine.on(QuizEvents.CORRECT, () => {
      this.#questionPageController.hideView();
      this.#questionResultPageController
        .addResultHeaderText(this.#feedbackGenerator.getRandomPositiveFeedbackMessage());
      this.#questionResultPageController.displayView();
    });
  }

  #addQuizEngineOnFalseEvent() {
    this.#quizEngine.on(QuizEvents.FALSE, () => {
      this.#questionPageController.hideView();
      this.#questionResultPageController
        .addResultHeaderText(this.#feedbackGenerator.getRandomNegativeFeedbackMessage());
      this.#questionResultPageController.displayView();
    });
  }

  #addQuizEngineOnDoneEvent() {
    this.#quizEngine.on(QuizEvents.DONE, async () => {
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

  // eslint-disable-next-line class-methods-use-this
  #verifyArguments(factory) {
    if (factory === null) {
      throw new AppFactoryError();
    }
    if (!(factory instanceof AppFactory)) {
      throw new AppFactoryError('Factory must be an instance of AppFactory');
    }
  }
}

export default App;
