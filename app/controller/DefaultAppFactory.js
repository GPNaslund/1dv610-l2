/* eslint class-methods-use-this: "off" */
import IntroPageController from './IntroPageController';
import QuestionPageController from './QuestionPageController';
import QuestionResultPageController from './QuestionResultPageController';
import SummaryPageController from './SummaryPageController';
import ChartGenerator from '../model/ChartGenerator';
import FeedbackGenerator from '../model/FeedbackGenerator';
import CleanCodeChapters from '../model/CleanCodeChapters';
import AppFactory from './AppFactory';

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
    return new SummaryPageController(chartGenerator, cleanCodeChapters);
  }

  createChartGenerator() {
    return new ChartGenerator();
  }

  createFeedBackGenerator() {
    return new FeedbackGenerator();
  }

  createCleanCodeChapters() {
    return new CleanCodeChapters();
  }
}

export default DefaultAppFactory;
