/* eslint class-methods-use-this: "off" */
import IntroPageController from './IntroPageController';
import QuestionPageController from './QuestionPageController';
import QuestionResultPageController from './QuestionResultPageController';
import SummaryPageController from './SummaryPageController';
import ChartGenerator from '../model/ChartGenerator';
import FeedbackGenerator from '../model/FeedbackGenerator';
import CleanCodeChapters from '../model/CleanCodeChapters';
import AppFactory from './AppFactory';
import cleanCodeQuestionsData from '../model/clean_code_questions.json';
import CleanCodeQuestions from '../model/CleanCodeQuestions';

/**
 * Represents the default set up for creating necessary dependencies for the application.
 */
class DefaultAppFactory extends AppFactory {
  createIntroPageController() {
    return new IntroPageController();
  }

  createQuestionPageController() {
    return new QuestionPageController();
  }

  createQuestionResultPageController() {
    return new QuestionResultPageController();
  }

  createSummaryPageController(chartGenerator, cleanCodeChapters) {
    this.#verifySummaryPageControllerArguments(chartGenerator, cleanCodeChapters);
    return new SummaryPageController(chartGenerator, cleanCodeChapters);
  }

  createChartGenerator() {
    return new ChartGenerator();
  }

  createFeedbackGenerator() {
    return new FeedbackGenerator();
  }

  createCleanCodeChapters() {
    return new CleanCodeChapters();
  }

  createCleanCodeQuestions() {
    return new CleanCodeQuestions(cleanCodeQuestionsData);
  }

  #verifySummaryPageControllerArguments(chartGenerator, cleanCodeChapters) {
    if (chartGenerator === null) {
      throw new TypeError('Chart generator cannot be null');
    }
    if (cleanCodeChapters === null) {
      throw new TypeError('Clean code chapters cannot be null');
    }
    if (!(chartGenerator instanceof ChartGenerator)) {
      throw new TypeError('Chart generator must be an instance of ChartGenerator');
    }
    if (!(cleanCodeChapters instanceof CleanCodeChapters)) {
      throw new TypeError('Clean code chapters must be instance of CleanCodeChapters');
    }
  }
}

export default DefaultAppFactory;
