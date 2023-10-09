import { QuizEngine, QuestionBank } from 'gn222gq-quiz-engine';
import QuestionsGenerator from '../model/QuestionsGenerator.js'
import feedbackMessages from '../../feedback_messages/feedback_messages.json';
import IntroPageController from './IntroPageController';
import QuestionPageController from './QuestionPageController';
import QuestionResultPageController from './QuestionResultPageController';
import SummaryPageController from './SummaryPageController';
import ChartGenerator from '../model/ChartGenerator.js';

class CleanCodeQuizApplication {
  #quizEngine
  #introPageController
  #questionPageController
  #questionResultPageController
  #summaryPageController
  #chartGenerator


  constructor() {
    this.#initQuizEngine();
    this.#introPageController = new IntroPageController(this.#quizEngine);
    this.#questionPageController = new QuestionPageController(this.#quizEngine);
    this.#questionResultPageController = new QuestionResultPageController(this.#quizEngine);
    this.#chartGenerator = new ChartGenerator();
    this.#summaryPageController = new SummaryPageController(this.#quizEngine, this.#chartGenerator);
  }


  #initQuizEngine() {
    const questionBank = new QuestionBank();
    // For testing purposes, not actual questions
    const questionsGenerator = new QuestionsGenerator();
    questionsGenerator.generateChapterQuestions(11, 1).questions.map(q => questionBank.createAndAddQuestion({ text: q.text, choices: q.choices, correctChoice: q.correctChoice, category: q.category }));
    this.#quizEngine = new QuizEngine(questionBank, "Player");
    this.#quizEngine.on("question", (questionData) => {
      
    })
    this.#quizEngine.on("correct", () => {
      this.#onCorrect();
    })
    this.#quizEngine.on("false", () => {
      this.#onFalse();
    })
    this.#quizEngine.on("done", async (scoreData) => {
      await this.#displaySummary();
    })
  }



  

  #onCorrect() {
    const randomIndex = Math.floor(Math.random() * feedbackMessages.positive.length);
    const randomMessage = feedbackMessages.positive[randomIndex];
    this.#questionResultHeader.innerText = randomMessage;
  }

  #onFalse() {
    this.#questionResult.classList.remove("hide")
    this.#questionResultHeader.innerText = "";
    const randomIndex = Math.floor(Math.random() * feedbackMessages.negative.length);
    const randomMessage = feedbackMessages.negative[randomIndex];
    this.#questionResultHeader.innerText = randomMessage;
  }



  


}


export default CleanCodeQuizApplication;