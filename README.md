# QUIZ ENGINE

This module is a standalone quiz engine built with the intent to be integrated into games or educational platforms. 

See [API Documentation](./out/index.html)

## FEATURES
### Quiz Result
A QuizResult is being created while the quiz is going on. The QuizResult holds the players name, the current score and contains functionality to generate a QuizResultSummary wich contains information about the results based on different categories. This feature adds value to the educational use cases where you can present detailed information about how a user has performed based on categories.

### Randomization
You decide if the questions should be displayed in a random order or sequential order.

### Highscore
Easily integrate a persistent highscore system that uses either local storage for browser or the local filesystem for use with node.js.

## Installation
```
npm install gn222gq-quiz-engine
```

## The API
## Example
Since the QuizEngine is the main part of the module, and it uses a event emitting way of communicating to listeners, the module works great for both node.js applications aswell as in browser environment.
```js
import {QuizEngine, QuizQuestions, Question} from 'gn222gq-quiz-engine';

const quizQuestions = new QuizQuestions();

const quizQuestions.createAndAddQuestion({
  text: "Is the sky blue", 
  choices: ["Yes", "No", "Sometimes"], 
  correctChoice: "Sometimes",
  category: "Nature"
  });
// .. More questions

const quizEngine = new QuizEngine(quizQuestions, "PlayerName");

/*      CALLBACKS      */

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

/*     SET-UP     */

// If you want peristent highscore on local filesystem
quizEngine.initFilesystemStorage("your-custom-path/highscore.json");
// or local storage for browser
quizEngine.initLocalStorage('my-awsome-quiz');

// If you want a randomized order on the questions
quizEngine.randomizeQuestions();


/*     USEFUL METHODS     */

// Starts the quiz and emits a 'question' event.
quizEngine.startQuiz();

// Advances the quiz, and emits 'question' event 
// if there are more questions and a 'done' event if no more questions.
quizEngine.continueQuiz();

// Checks answer and assigns a point and emits 'correct' event if corret.
// Emits a 'false' event if answer is not correct.
quizEngine.answerQuestion(answer);

// Resets the quiz
quizEngine.resetQuiz();

// Gives indication if there are more questions
quizEngine.hasMoreQuestions();

// Returns a Highscore object (see below)
quizEngine.getHighscore();

// Returns a QuizResultSummary object (see below)
quizEngine.getSummary();


```

### Create a QuizQuestions object and questions for the quiz
```js
import {QuizQuestions, Question} from 'gn222gq-quiz-engine';

const quizQuestions = new QuizQuestions();

// You can instantiate Question objects seperately..
const questionObject = new Question({
  text: "text", 
  choices:["choice", "choice2"], 
  correctChoice: "choice", 
  category: "Example"
});

// ..and pass the to the addQuestion() method.
quizQuestions.addQuestion(questionObject);

// You can also supply the constructor arguments for a Question object to the createAndAddQuestion() method to create a Question
// that will be added to the QuizQuestions.
quizQuestions.createAndAddQuestion({text: "text", choices:["choice", "choice2"], correctChoice: "choice", category: "Example"});

```

### Highscore and QuizResultSummary
```js
import {QuizEngine, QuizQuestions, Question} from 'gn222gq-quiz-engine';

// Implemented setup etc..

// Get the Highscore object
const highscore = await quizEngine.getHighscore();
highscore.toString() // Returns a string representation of the highscore.
highscore.toArray() // Returns an array containing the representation of the highscore.

// Get the QuizResultSummary object
const quizResult = await quizEngine.getSummary();
quizResult.toString() // Returns a string representation of the QuizResultSummary.
quizResult.toArray() // Returns an array containing the representation of the QuizResultSummary.
quizResult.playerName // Gets the players name
quizResult.score // Gets the players score
quizResult.allCategorySummaries // Gets an array of QuizCategorySummary

// Get a QuizCategorySummary
const categorySummary = quizResult.allCategorySummaries[0];
categorySummary.toString() // Returns a string representation of the QuizCategorySummary.
categorySummary.toArray() // Returns an array containing the representation of the QuizCategorySummary.
categorySummary.nameOfCategory // Gets the name of the category
categorySummary.amountOfQuestions // Gets the amount of questions for that category
categorySummary.amountOfCorrectAnswers // Gets the amount of correct answers
categorySummary.percentageOfCorrectAnswers // Gets the percentage of correct answers in the category.
```
