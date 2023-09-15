
import QuizEngine from '../QuizEngine.js';
import QuestionBank from '../QuestionBank.js';

document.addEventListener('DOMContentLoaded', function () {
  const questionBank = new QuestionBank();
  questionBank.createAndAddQuestion({text: "Is the sky blue?", choices: ["Yes", "No"], correctChoice: "Yes"});
  questionBank.createAndAddQuestion({text: "Is water wet?", choices: ["Yes", "No"], correctChoice: "Yes"});
  questionBank.createAndAddQuestion({text: "Are puppies cute?", choices: ["Yes", "No"], correctChoice: "Yes"});

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
        quizEngine.answerQuestion(choice);
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

  quizEngine.on('done', async (playerData) => {
    answerButtons.replaceChildren();
    questionElement.innerText = "QUIZ DONE!";
    scoreElement.innerText = playerData.playerName + ', Score - ' + playerData.score;
    const highscore = await quizEngine.getHighScore();
    highscore.toArray().forEach((highscore) => {
      const pElement = document.createElement('p');
      pElement.innerText = highscore;
      highscoreElement.appendChild(pElement);
    })
  })


});


