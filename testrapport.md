# TEST SUMMARY

## Question.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | Question class constructor() should correctly create a new instance | passed |
| constructor() | Question class constructor() should throw type errors for invalid constructor arguments | passed |

## QuizCategorySummary.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizCategorySummary class constructor() should initialize successfully | passed |
| toString() | QuizCategorySummary class toString() should return a string representation | passed |
| toArray() | QuizCategorySummary class toArray() should return an array containing strings with the summary representation | passed |

## QuizResultSummary.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizResultSummary class constructor() should initialize successfully | passed |
| addCategorySummary() | QuizResultSummary class addCategorySummary() should add a QuizCategorySummary successfully | passed |
| addCategorySummary() | QuizResultSummary class addCategorySummary() should throw TypeError if argument is not a QuizCategorySummary | passed |
| toString() | QuizResultSummary class toString() should return a string representation | passed |
| toArray() | QuizResultSummary class toArray() should return an array with strings containing representation | passed |

## QuizQuestions.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizQuestions class constructor() should initialize empty | passed |
| addQuestion() | QuizQuestions class addQuestion() should add a new Question object to allQuestions | passed |
| addQuestion() | QuizQuestions class addQuestion() throws error if passed wrong type of object | passed |
| createAndAddQuestion() | QuizQuestions class createAndAddQuestion() should add a new question | passed |
| removeQuestion() | QuizQuestions class removeQuestion() removes a question with correct arguments | passed |
| removeQuestion() | QuizQuestions class removeQuestion() throws error with non-validated arguments | passed |
| getQuestion() | QuizQuestions class getQuestion() returns a question at the correct index | passed |
| getQuestion() | QuizQuestions class getQuestion() should throw an error with invalid arguments | passed |
| getAllQuestions() | QuizQuestions class getAllQuestions() should work with Question objects stored | passed |
| getAllQuestions() | QuizQuestions class getAllQuestions() should work with no Question objects stored | passed |
| hasQuestions() | QuizQuestions class hasQuestions() should return true when questions exist | passed |
| hasQuestions() | QuizQuestions class hasQuestions() should return false when no questions exist | passed |

## QuestionsManager.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuestionsManager class constructor() should initialize successfully | passed |
| hasMoreQuestions() | QuestionsManager class hasMoreQuestions() should return true if more questions are available | passed |
| getQuestion() | QuestionsManager class getQuestion() should return the question at the current index | passed |
| reset() | QuestionsManager class reset() should reset the currentIndex to 0 | passed |

## QuizResult.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizResult class constructor() should successfully be created with correct constructor arguments | passed |
| constructor() | QuizResult class constructor() should throw error if provided invalid constructor arguments | passed |
| addQuestionResult() | QuizResult class addQuestionResult() should add the questionResult info to #questionResultDetails | passed |
| addQuestionResult() | QuizResult class addQuestionResult() should throw error if invalid argument is passed | passed |
| generateSummary() | QuizResult class generateSummary() should correctly generate a summary | passed |
| incrementScore() | QuizResult class incrementScore() should successfully increment the score | passed |
| QuizResult class | QuizResult class should throw error with invalid arguments | passed |

## QuestionResult.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuestionResult class constructor() should initializes successfully | passed |
| constructor() | QuestionResult class constructor() should throw error on invalid argument | passed |

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
| hasMoreQuestions() | QuizEngine class hasMoreQuestions() should return true if there are more questions | passed |
| hasMoreQuestions() | QuizEngine class hasMoreQuestions() should return false if there are no more questions | passed |
| hasMoreQuestions() | QuizEngine class hasMoreQuestions() should return true after a reset, even if previously false | passed |
| getSummary() | QuizEngine class getSummary() should return a QuizResultSummary object | passed |
| getSummary() | QuizEngine class getSummary() should return summary data based on answers | passed |
