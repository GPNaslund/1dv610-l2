/* eslint class-methods-use-this: "off" */

// Abstract factory

// eslint-disable-next-line no-unused-vars
class AppFactory {
  createIntroPageController() {
    throw new Error('This method is abstract and must be implemented');
  }

  createQuestionPageController() {
    throw new Error('This method is abstract and must be implemented');
  }

  createQuestionResultPageController() {
    throw new Error('This method is abstract and must be implemented');
  }

  createSummaryPageController() {
    throw new Error('This method is abstract and must be implemented');
  }

  createChartGenerator() {
    throw new Error('This method is abstract and must be implemented');
  }

  createFeedbackGenerator() {
    throw new Error('This method is abstract and must be implemented');
  }

  createCleanCodeChapters() {
    throw new Error('This method is abstract and must be implemented');
  }
}
