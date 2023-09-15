# TEST SUMMARY

## Question.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | Question class constructor() should correctly create a new instance | passed |
| constructor() | Question class constructor() should throw type errors for invalid constructor arguments | passed |

## QuestionBank.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuestionBank class constructor() should initialize empty | passed |
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

## QuizResultSummary.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizResultSummary class constructor() should initialize successfully | passed |
| addCategorySummary() | QuizResultSummary class addCategorySummary() should add a QuizCategorySummary successfully | passed |
| addCategorySummary() | QuizResultSummary class addCategorySummary() should throw TypeError if argument is not a QuizCategorySummary | passed |

## QuizResult.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizResult class constructor() should successfully be created with correct constructor arguments | passed |
| constructor() | QuizResult class constructor() should throw error if provided invalid constructor arguments | passed |
| addQuestionResult() | QuizResult class addQuestionResult() should add the questionResult info to #questionResultDetails | passed |
| addQuestionResult() | QuizResult class addQuestionResult() should throw error if invalid argument is passed | passed |
| generateSummary() | QuizResult class generateSummary() should correctly generate a summary | passed |

## QuizCategorySummary.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizCategorySummary class constructor() should initialize successfully | passed |

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

## Scoreboard.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | Scoreboard class constructor() should initiate succesfully with correct argument | passed |
| constructor() | Scoreboard class constructor() should initiate succesully with points argument also | passed |
| constructor() | Scoreboard class constructor() should throw error with invalid arguments | passed |
| addPoints() | Scoreboard class addPoints() should successfully add points to score | passed |
| addPoints() | Scoreboard class addPoints() should throw error with invalid arguments | passed |
| deductPoints() | Scoreboard class deductPoints() should successfully deduct points from the score | passed |
| deductPoints() | Scoreboard class deductPoints() should throw error with invalid arguments | passed |
| reset() | Scoreboard class reset() should reset the score to 0 | passed |

## QuestionsManager.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuestionsManager class constructor() should initialize successfully | passed |
| hasMoreQuestions() | QuestionsManager class hasMoreQuestions() should return true if more questions are available | passed |
| getQuestion() | QuestionsManager class getQuestion() should return the question at the current index | passed |
| reset() | QuestionsManager class reset() should reset the currentIndex to 0 | passed |
