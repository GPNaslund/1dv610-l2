import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

import QuizEngine from "../QuizEngine.js";
import QuestionBank from '../QuestionBank.js';
import { quizQuestions } from './appQuestions.js';


class App {
  questionBank;
  quizEngine;

  constructor() {
    this.questionBank = new QuestionBank();
    quizQuestions.forEach(question => this.questionBank.createAndAddQuestion(question));
  }

  async main() {
    const username = await this.#getUsername();
    console.log("=== WELCOME TO THE QUIZ " + username.toUpperCase() + " ===");
    this.quizEngine = new QuizEngine(this.questionBank, username);
    this.quizEngine.initFilesystemStorage();

    this.quizEngine.on('question', async (questionData) => {
      await this.onQuestion(questionData);
    });

    this.quizEngine.on('correct', async (scoreData) => {
      await this.onAnswerFeedback(scoreData, "=== CORRECT ANSWER ===");
    });

    this.quizEngine.on('false', async (scoreData) => {
      await this.onAnswerFeedback(scoreData, "=== FALSE ANSWER ===");
    });

    this.quizEngine.on('done', async (scoreData) => {
      await this.onDone(scoreData);
    })

    this.quizEngine.startQuiz();
  }

   async onQuestion(questionData) {
    try {
      this.#askQuestion(questionData);
      const userInput = await this.#getUserInput("Enter your choice: ");
      const answer = parseInt(userInput) - 1;
      this.quizEngine.answerQuestion(questionData.choices[answer]);
    } catch (e) {
      console.log(e.message);
      this.onQuestion(questionData);
    }
  }

  async onAnswerFeedback(scoreData, header) {
    this.#createNewLines(2);
    console.log(header);
    console.log(`${scoreData.playerName} - Score: ${scoreData.score}`);
    this.#createNewLines(2);;
    await this.quizEngine.continueQuiz();
  }

  async onDone(scoreData) {
    try {
      this.#createNewLines(2);
      console.log("=== QUIZ DONE! === ");
      console.log(`${scoreData.playerName} - Score: ${scoreData.score}`);
      this.#createNewLines(2);
      await this.#printHighscore();
      process.exit(0);
    } catch (e) {
      console.log(e.message);
      process.exit(0);
    }
  }

  #askQuestion(questionData) {
    console.log(questionData.text);
    for (let i = 0; i < questionData.choices.length; i++) {
      console.log(`${i + 1}. ${questionData.choices[i]}`);
    }
  }

  async #getUserInput(questionText) {
    let userInput = await rl.question(questionText)
    return userInput;
  }

  async #printHighscore() {
    const highscore = await this.quizEngine.getHighScore();
    console.log("=== HIGHSCORE ===");
    highscore.toArray().forEach((string) => console.log(string));
  }

  #createNewLines(lineAmount){
    for (let i = 0; i < lineAmount; i++) {
      console.log();
    }
  }

  async #getUsername() {
    try {
      const username = await rl.question("Enter your name: ");
      if (username.length < 0 || username.length > 50) throw new RangeError("Username cannot be empty or longer than 50 characters");
      return username;
    } catch (e) {
      console.log(e.message);
      this.#getUsername();
    }
  }
}

const app = new App();
app.main();