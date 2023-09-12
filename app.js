import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

import QuizEngine from "./QuizEngine.js";
import QuestionBank from './QuestionBank.js';


const questionBank = new QuestionBank();
questionBank.createAndAddQuestion("What is the capital of Sweden?", ["Oslo", "Paris", "Tunis", "Stockholm"], 3);
questionBank.createAndAddQuestion("How many legs has a spider?", ["4", "6", "8"], 2);
questionBank.createAndAddQuestion("What comes after rain?", ["Snow", "Sunshine", "More rain"], 1);

const quizEngine = new QuizEngine(questionBank, "Gustav");

quizEngine.on("question", (questionData) => {
  console.log(questionData.text);
  for (let i = 0; i < questionData.choices.length; i++) {
    console.log(`${i + 1}. ${questionData.choices[i]}`);
  }
  rl.question("Your answer: ").then((answer) => {
    quizEngine.answerQuestion(answer - 1);
  });
});

quizEngine.on('correct', (scoreData) => {
  console.log("=== CORRECT AWNSER! === ");
  console.log(`${scoreData.playerName} - Score: ${scoreData.score}`);
  quizEngine.continueQuiz();
});

quizEngine.on('false', (scoreData) => {
  console.log("=== WRONG AWNSER! === ");
  console.log(`${scoreData.playerName} - Score: ${scoreData.score}`);
  quizEngine.continueQuiz();
});

quizEngine.on('done', (scoreData) => {
  console.log("=== QUIZ DONE! === ");
  console.log(`${scoreData.playerName} - Score: ${scoreData.score}`);
})

quizEngine.initFilesystemStorage();
quizEngine.startQuiz();
