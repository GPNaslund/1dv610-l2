
import QuizEngine from './QuizEngine.js';
import QuestionBank from './QuestionBank.js';

document.addEventListener('DOMContentLoaded', function () {
  const questionBank = new QuestionBank();
  questionBank.createAndAddQuestion("Is the sky blue?", ["Yes", "No"], 0);
  questionBank.createAndAddQuestion("Is water wet?", ["Yes", "No"], 0);
  questionBank.createAndAddQuestion("Are puppies cute?", ["Yes", "No"], 0);

  const quizEngine = new QuizEngine(questionBank, "Gustav");
  quizEngine.initLocalStorage();

  const startButton = document.getElementById('start-button');
  const answerButtons = document.getElementById('answer-buttons');
  const questionElement = document.getElementById('question');
  const scoreElement = document.getElementById('score');
  const highscoreElement = document.getElementById('highscore');

  startButton.addEventListener('click', () => {
    quizEngine.startQuiz();
    startButton.style.display = 'none';
  });


  quizEngine.on('question', (questionData) => {
    questionElement.innerText = questionData.text;
    questionData.choices.forEach((choice, index) => {
      const choiceButton = document.createElement('button');
      choiceButton.innerText = choice;
      choiceButton.addEventListener('click', () => {
        quizEngine.answerQuestion(index);
      });
      answerButtons.appendChild(choiceButton);
    });
  });

  quizEngine.on('correct', (playerData) => {
    answerButtons.replaceChildren();
    questionElement.innerText = "CORRECT ANSWER!";
    scoreElement.innerText = playerData.playerName + ', Score - ' + playerData.score;
    quizEngine.continueQuiz();
  });

  quizEngine.on('false', (playerData) => {
    answerButtons.replaceChildren();
    questionElement.innerText = "WRONG ANSWER!";
    scoreElement.innerText = playerData.playerName + ', Score - ' + playerData.score;
    quizEngine.continueQuiz();
  })

  quizEngine.on('done', (playerData) => {
    answerButtons.replaceChildren();
    questionElement.innerText = "QUIZ DONE!";
    scoreElement.innerText = playerData.playerName + ', Score - ' + playerData.score;
  })


});


