# QUIZ ENGINE

This module is a standalone quiz engine built with the intent to be integrated into games or educational platforms. 

## FEATURES
### Question bank
Add all your questions to the question bank! The question bank is is used to store all the questions you add, and is used inside the engine through the question manager to get questions, and comparing user input against the correct answer of the question.

### Scoreboard
The scoreboard holds the player name and keeps track of the user score.

### Randomization
You decide if the questions should be displayed in a random order or sequential order.

### Highscore
Easily integrate a persistent highscore system that uses either local storage for browser or the local filesystem for use with node.js.

### Generating a summary per category
The questions you add can have category property. That category property becomes extra useful for integration with educational purposes. You can query the engine to generate a QuizSummary, where each category gets summed up so you can inform your users on where they did good and where they need to practice more!

## The API
### QuestionBank
Used to store Question objects.
```js
const questionBank = new QuestionBank();

// You can add questions through this method, where you have prebuilt a Question object and supply that to the method.
questionBank.addQuestion(questionObject);

// You can also supply the constructor arguments for a Question object to the createAndAddQuestion() method to create a Question
// that will be added to the QuestionBank.
questionBank.createAndAddQuestion({text: "text", choices:["choice", "choice2"], correctChoice: "choice", category: "Example"});

// When you need to remove a Question from the QuestionBank, just use:
questionBank.removeQuestion(indexOfQuestion);

// You can also query the QuestionBank for a specific question:
questionBank.getQuestion(indexOfQuestion);

// If you want all the stored questions, call:
questionBank.getAllQuestions();

// With this method you can check if there are any stored Questions in the question bank:
questionBank.hasQuestions();
```

### Question
Used to store question information.
```js
// Construction of a question needs an object containing: text, choices, correctChoice and category arguments.
const question = new Question({
  text: "The questions text",
  choices: ["Choice 1", "Choice 2", "Choice 3"],
  correctChoice: "Choice 1",
  category: "Example"
});

//All attributes are reachable through getters:
question.text // "The questions text"
question.choices // ["Choice 1", "Choice 2", "Choice 3"]
question.correctChoice // "Choice 1"
question.category // "Example"
```

### QuizEngine
The main class.
```js
// Construction needs a QuestionBank object containing questions and a playername.
const quizEngine = new QuizEngine(questionBank, playerName);

// Will emit a 'question' event with the questionData(containing text + choices).
quizEngine.startQuiz();

// Checks if the answer is correct of the current question.
// If answer is correct, adds one point to the player and emits 'correct' event (containing playerName + score).
// If answer is false, emits 'false' event (containing playerName + score). 
quizEngine.answerQuestion(answer);

// Will advance the quiz loop.
// If more questions available, will emit 'question' event (containing text + choices).
// If no more questions available, will emit 'done' event (containing playerName + score).
quizEngine.continueQuiz();

// Will reset the score, index of question and order of questions.
quizEngine.reset();

// Check if there are any more questions
quizEngine.hasMoreQuestions();

// Randomize the order of the questions
quizEngine.randomizeQuestions();

// Used to initialize a peristent highscore in local filesystem. Path must be to a .JSON destination.
quizEngine.initFilesystemStorage(path);

// Used to initialize a peristent highscore to local storage in the browser.
quizEngine.initLocalStorage(keyName);

// If highscore persistence has been initialized, this method returns a Highscore object containing the highscore data.
// The Highscore object has .toString(), .toArray() and toJSON() methods for usage and formatting.
await quizEngine.getHighscore();
```



## Example
Since the QuizEngine is the main part of the module, and it uses a event emitting way of communicating to listeners, the module works great for both node.js applications aswell as in browser environment.
```js
import {QuizEngine, QuestionBank, Question} from 'quiz-engine';

const questionBank = new QuestionBank();

const questionBank.createAndAddQuestion({
  text: "Is the sky blue", 
  choices: ["Yes", "No", "Sometimes"], 
  correctChoice: "Sometimes",
  category: "Nature"
  });
// .. More questions

const quizEngine = new QuizEngine(questionBank, "PlayerName");

// If you want peristent highscore on local filesystem
quizEngine.initFilesystemStorage("your-custom-path/highscore.json");
// or local storage for browser
quizEngine.initLocalStorage('my-awsome-quiz');

quizEngine.on('question', (questionData) => {
  /* Your application specific logic */
  // Display question --> Get user input --> call quizEngine.answerQuestion(userInput); for example.

  // questionData.text is the current question text.
  // questionData.choices is the current question choices.
})

quizEngine.on('correct', (scoreData) => {
  /* Your application specific logic */
  // Display information + call quizEngine.continueQuiz() for example.

  // scoreData.playerName is the current players name.
  // scoreData.score is the current players score.
})

quizEngine.on('false', (scoreData) => {
  /* Your application specific logic */
  // Display information + call quizEngine.continueQuiz() for example.
})

quizEngine.on('done', (scoreData) => {
  /* Your application specific logic */
  // Display information + call quizEngine.getHighscore() to display the persistent highscore
  // if initialized for example.
})


quizEngine.startQuiz();
```


