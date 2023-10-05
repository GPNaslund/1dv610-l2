import {QuizEngine, Question, QuestionBank} from 'gn222gq-quiz-engine';
import questionsData from './questions/questions_data.json';
import feedbackMessages from './feedback_messages/feedback_messages.json';
import ChartGenerator from './ChartGenerator';

class CleanCodeQuizApplication {
  #startQuizButton
  #welcomeSection
  #questionSection
  #summarySection
  #quizEngine;
  #questionText
  #answerButtons
  #questionResultHeader
  #nextQuestionButton
  #questionResult
  #summaryList
  #chartContainer
  #resetQuizButton

  constructor() {
    this.#startQuizButton = document.querySelector("#start-quiz-btn");
    this.#welcomeSection = document.querySelector("#welcome-section");
    this.#questionSection = document.querySelector("#question-section");
    this.#summarySection = document.querySelector("#summary-section");
    this.#summarySection.style.display = "none";
    this.#questionText = document.querySelector("#question-text");
    this.#answerButtons = document.querySelector("#answer-buttons");
    this.#questionResultHeader = document.querySelector("#question-result-header");
    this.#nextQuestionButton = document.querySelector("#next-question-button");
    this.#questionResult = document.querySelector("#question-result");
    this.#questionResult.style.display = "none";
    this.#summaryList = document.querySelector("#summary-list");
    this.#chartContainer = document.querySelector("#chart-container");
    this.#resetQuizButton = document.querySelector("#restart-quiz-btn");
  }

  init() {
    this.#setStartQuizButtonEvent();
    this.#setResetQuizButtonEvent();
    this.#addNextQuestionButtonEvent();
    this.#initQuizEngine();
  }

  #initQuizEngine() {
    const questionBank = new QuestionBank();
    questionsData.questions.map(q => questionBank.createAndAddQuestion({text: q.text, choices: q.choices, correctChoice: q.correctChoice, category: q.category}));
    this.#quizEngine = new QuizEngine(questionBank, "Player");
    this.#quizEngine.on("question", (questionData) => {
      this.#displayQuestion(questionData);
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


  #setStartQuizButtonEvent() {
    this.#startQuizButton.addEventListener("click", () => {
      this.#welcomeSection.style.display = "none";
      this.#quizEngine.startQuiz();
    })
  }

  #setResetQuizButtonEvent() {
    this.#resetQuizButton.addEventListener("click", () => {
      this.#quizEngine.resetQuiz();
      this.#summarySection.style.display = "none";
      this.#welcomeSection.style.display = "block";
    })
  }

  #addNextQuestionButtonEvent() {
    this.#nextQuestionButton.addEventListener("click", () => {
      this.#quizEngine.continueQuiz();
    })
  }

  #onCorrect() {
    this.#questionSection.style.display = "none";
    this.#questionResult.style.display = "block";
    this.#questionResultHeader.innerText = "";
    const randomIndex = Math.floor(Math.random() * feedbackMessages.positive.length);
    const randomMessage = feedbackMessages.positive[randomIndex];
    this.#questionResultHeader.innerText = randomMessage;
  }

  #onFalse() {
    this.#questionSection.style.display = "none";
    this.#questionResult.style.display = "block";
    this.#questionResultHeader.innerText = "";
    const randomIndex = Math.floor(Math.random() * feedbackMessages.negative.length);
    const randomMessage = feedbackMessages.negative[randomIndex];
    this.#questionResultHeader.innerText = randomMessage;
  }

  #displayQuestion(questionData) {
    this.#questionResult.style.display = "none";
    this.#questionSection.style.display = "block";
    this.#questionText.innerText = "";
    this.#answerButtons.replaceChildren();
    this.#questionText.innerText = questionData.text;
    for (let i = 0; i < questionData.choices.length; i++) {
      const answerBtn = document.createElement("div");
      answerBtn.setAttribute("role", "button");
      answerBtn.innerText = questionData.choices[i];
      answerBtn.addEventListener("click", () => {
        this.#quizEngine.answerQuestion(questionData.choices[i]);
      })
      this.#answerButtons.appendChild(answerBtn);
    }
  }

  async #displaySummary() {
    this.#chartContainer.replaceChildren();
    this.#questionResult.style.display = "none";
    this.#summarySection.style.display = "block";
    this.#summaryList.replaceChildren();
    const allSummaries = await this.#quizEngine.getSummary()
    const categories = allSummaries.allCategorySummaries.map(catSummary => catSummary.nameOfCategory);
    const scores = allSummaries.allCategorySummaries.map(catSummary => catSummary.percentageOfCorrectAnswers);
    const chartGenerator = new ChartGenerator();
    const chart = chartGenerator.generateApexChart(this.#chartContainer, scores, categories);
    chart.render();
  }

}


export default CleanCodeQuizApplication;