import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

import QuizEngine from "./QuizEngine.js";
import QuestionBank from './QuestionBank.js';
import { quizQuestions } from './appQuestions.js';

const questionBank = new QuestionBank();
quizQuestions.forEach(question => questionBank.createAndAddQuestion(question));

const quizEngine = new QuizEngine(questionBank, "Gustav");

quizEngine.on("question", (questionData) => {
  askQuestion(questionData);
});

quizEngine.on('correct', async (scoreData) => {
  createSpace(2);
  console.log("=== CORRECT AWNSER! === ");
  console.log(`${scoreData.playerName} - Score: ${scoreData.score}`);
  createSpace(2);
  await quizEngine.continueQuiz();
});

quizEngine.on('false', async (scoreData) => {
  createSpace(2);
  console.log("=== WRONG AWNSER! === ");
  console.log(`${scoreData.playerName} - Score: ${scoreData.score}`);
  createSpace(2);
  await quizEngine.continueQuiz();
});

quizEngine.on('done', (scoreData) => {
  createSpace(2);
  console.log("=== QUIZ DONE! === ");
  console.log(`${scoreData.playerName} - Score: ${scoreData.score}`);
  createSpace(2);
  printHighscore().catch((e) => console.log(e));
  process.exit(0);
})

quizEngine.initFilesystemStorage();
console.log("=== WELCOME TO THE QUIZ ===");
createSpace(1);
quizEngine.startQuiz();



function createSpace(amount){
  for (let i = 0; i < amount; i++) {
    console.log();
  }
}

function askQuestion(questionData) {
  try {
    console.log(questionData.text);
    for (let i = 0; i < questionData.choices.length; i++) {
      console.log(`${i + 1}. ${questionData.choices[i]}`);
    }
    rl.question("Your answer: ").then((answer) => {
      quizEngine.answerQuestion(parseInt(answer) - 1);
    }).catch((e) => {
      createSpace(2);
      console.log(e.message);
      createSpace(2);
      askQuestion(questionData);
    });
  } catch (e) {
    createSpace(2);
    console.log(e.message);
    createSpace(2);
    askQuestion(questionData);
  }
}


async function printHighscore() {
  const highscore = await quizEngine.getHighScore();
  console.log("=== HIGHSCORE ===");
  highscore.toArray().forEach((string) => console.log(string));
}