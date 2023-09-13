# TEST SUMMARY

## Scoreboard.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor | Scoreboard class constructor should initiate succesfully with correct argument | passed |
| constructor | Scoreboard class constructor should initiate succesully with points argument also | passed |
| constructor | Scoreboard class constructor should throw error with invalid arguments | passed |
| addPoints() | Scoreboard class addPoints() should successfully add points to score | passed |
| addPoints() | Scoreboard class addPoints() should throw error with invalid arguments | passed |
| deductPoints() | Scoreboard class deductPoints() should successfully deduct points from the score | passed |
| deductPoints() | Scoreboard class deductPoints() should throw error with invalid arguments | passed |
| reset() | Scoreboard class reset() should reset the score to 0 | passed |

## QuizResult.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| Creating a QuizResult object | QuizResult class Creating a QuizResult object should successfully be created with correct constructor arguments | passed |
| Creating a QuizResult object | QuizResult class Creating a QuizResult object should throw error if provided invalid constructor arguments | passed |
| addQuestionResult() | QuizResult class addQuestionResult() should add the questionResult info to #questionResultDetails | passed |
| addQuestionResult() | QuizResult class addQuestionResult() should throw error if invalid argument is passed | passed |
| generateSummary() | QuizResult class generateSummary() should correctly generate a summary | passed |

## QuestionBank.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| QuestionBank class | QuestionBank class should initialize empty | passed |
| addQuestion() | QuestionBank class addQuestion() should add a new Question object to allQuestions | passed |
| addQuestion() | QuestionBank class addQuestion() throws error if passed wrong type of object | passed |
| createAndAddQuestion() | QuestionBank class createAndAddQuestion() should add a new question | passed |
| removeQuestion() | QuestionBank class removeQuestion() removes a question with correct arguments | passed |
| removeQuestion() | QuestionBank class removeQuestion() throws error with non-validated arguments | passed |
| getQuestion() | QuestionBank class getQuestion() returns a question at the correct index | passed |
| getQuestion() | QuestionBank class getQuestion() should throw an error with invalid arguments | passed |
| getAllQuestions() | QuestionBank class getAllQuestions() should work with Question objects stored | passed |
| getAllQuestions() | QuestionBank class getAllQuestions() should work with no Question objects stored | passed |
| hasQuestions() | QuestionBank class hasQuestions() should return true when questions exist | passed |
| hasQuestions() | QuestionBank class hasQuestions() should return false when no questions exist | passed |

## QuizEngine.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizEngine class constructor() should create an instance successfully | passed |
| constructor() | QuizEngine class constructor() should throw error if not provided correct arguments | passed |
| startQuiz() | QuizEngine class startQuiz() should emit 'question' event containing the text and choices data | passed |
| answerQuestion(answer) | QuizEngine class answerQuestion(answer) should emit 'correct' event if answer is correct, with playername and player score data | passed |
| answerQuestion(answer) | QuizEngine class answerQuestion(answer) should emit 'false' event if answer is incorrect, with playername and player score data | passed |
| continueQuiz() | QuizEngine class continueQuiz() if more questions, should advance index by one and emit question event | passed |
| continueQuiz() | QuizEngine class continueQuiz() if no more questions, should emit 'done' event with playername and player score data | passed |

## QuestionsManager.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| QuestionsManager class | QuestionsManager class should initialize successfully | passed |
| hasMoreQuestions() | QuestionsManager class hasMoreQuestions() should return true if more questions are available | passed |
| getQuestion() | QuestionsManager class getQuestion() should return the question at the current index | passed |
| isAnswerCorrect() | QuestionsManager class isAnswerCorrect() should return true if provided the correct index | passed |
| isAnswerCorrect() | QuestionsManager class isAnswerCorrect() should return false if provided the wrong index | passed |
| isAnswerCorrect() | QuestionsManager class isAnswerCorrect() should throw error if arguments are not valid | passed |
| reset() | QuestionsManager class reset() should reset the currentIndex to 0 | passed |

## Question.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor | Question class constructor should correctly create a new instance | passed |
| constructor | Question class constructor should throw type errors for invalid constructor arguments | passed |
