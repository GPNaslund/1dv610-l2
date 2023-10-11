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

  constructor() {
    super();
  }

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

}

export default DefaultAppFactory;
