# TEST SUMMARY

## Question.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | Question class constructor() should correctly create a new instance | passed |
| constructor() | Question class constructor() should throw errors for invalid constructor arguments | passed |

## QuestionResult.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuestionResult class constructor() should correctly identify the correct answer | passed |
| constructor() | QuestionResult class constructor() should correctly identify the incorrect answer | passed |
| constructor() | QuestionResult class constructor() should throw errors for invalid arguments | passed |

## QuizQuestions.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizQuestions class constructor() should initialize empty | passed |
| addQuestion() | QuizQuestions class Question manipulation addQuestion() should add a new Question object to allQuestions | passed |
| addQuestion() | QuizQuestions class Question manipulation addQuestion() throws error if passed wrong type of object | passed |
| createAndAddQuestion() | QuizQuestions class Question manipulation createAndAddQuestion() should add a new question | passed |
| removeQuestion() | QuizQuestions class Question manipulation removeQuestion() removes a question with correct arguments | passed |
| getQuestion() | QuizQuestions class Question manipulation getQuestion() returns a question at the correct index | passed |
| getAllQuestions() | QuizQuestions class Question manipulation getAllQuestions() should work with no Question objects stored | passed |
| getAllQuestions() | QuizQuestions class Question manipulation getAllQuestions() should work with Question objects stored | passed |
| hasQuestions() | QuizQuestions class Question manipulation hasQuestions() should return true when questions exist | passed |
| hasQuestions() | QuizQuestions class Question manipulation hasQuestions() should return false when no questions exist | passed |
| removeQuestion() errors | QuizQuestions class Error handling removeQuestion() errors throws error with non-validated arguments | passed |
| getQuestion() errors | QuizQuestions class Error handling getQuestion() errors should throw an error with invalid arguments | passed |

## QuizCategorySummary.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizCategorySummary class constructor() should initialize successfully | passed |
| constructor() | QuizCategorySummary class constructor() should throw error for invalid question count | passed |
| constructor() | QuizCategorySummary class constructor() should throw error for invalid correct answer count | passed |
| string and array representations | QuizCategorySummary class string and array representations should convert to string | passed |
| string and array representations | QuizCategorySummary class string and array representations should convert to array | passed |

## QuizResultSummary.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizResultSummary class constructor() initializes with valid arguments | passed |
| Error handling | QuizResultSummary class constructor() Error handling throws InvalidPlayerNameError for invalid name | passed |
| Error handling | QuizResultSummary class constructor() Error handling throws InvalidScoreTypeError for invalid score | passed |
| addCategorySummary() | QuizResultSummary class addCategorySummary() adds a QuizCategorySummary | passed |
| addCategorySummary() | QuizResultSummary class addCategorySummary() throws error when adding a non-QuizCategorySummary | passed |
| toString() | QuizResultSummary class toString() returns string representation of summary | passed |
| toArray() | QuizResultSummary class toArray() returns array representation of summary | passed |

## QuestionsManager.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuestionsManager class constructor() should initialize successfully | passed |
| constructor() | QuestionsManager class constructor() should throw error on invalid constructor arguments | passed |
| hasMoreQuestions() | QuestionsManager class hasMoreQuestions() should determine if more questions are available | passed |
| getQuestion() | QuestionsManager class getQuestion() should retrieve the current question based on index | passed |
| reset() | QuestionsManager class reset() should reset the question index | passed |

## QuizResult.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizResult class constructor() creates an instance with valid arguments | passed |
| Error handling | QuizResult class constructor() Error handling throws InvalidPlayerNameError with invalid name | passed |
| Error handling | QuizResult class constructor() Error handling throws InvalidScoreTypeError with invalid score | passed |
| addQuestionResult() | QuizResult class addQuestionResult() adds a QuestionResult to questionResults | passed |
| addQuestionResult() | QuizResult class addQuestionResult() throws error with invalid QuestionResult | passed |
| generateSummary() | QuizResult class generateSummary() generates a correct summary | passed |
| incrementScore() | QuizResult class incrementScore() increments the score | passed |
| incrementScore() | QuizResult class incrementScore() throws InvalidScoreTypeError with invalid score increment | passed |

## QuizEngine.test.js 
| METHOD |   TEST CASE   | TEST RESULT | 
|--------|---------------|-------------|
| constructor() | QuizEngine class constructor() should create an instance successfully | passed |
| constructor() | QuizEngine class constructor() should throw errors for invalid constructor arguments | passed |
| QuizEngine events | QuizEngine class QuizEngine events should emit 'question' event on startQuiz() | passed |
| QuizEngine events | QuizEngine class QuizEngine events should emit 'correct' event if answer is correct | passed |
| QuizEngine events | QuizEngine class QuizEngine events should emit 'false' event if answer is incorrect | passed |
| QuizEngine events | QuizEngine class QuizEngine events should emit 'question' event on continueQuiz() | passed |
| QuizEngine events | QuizEngine class QuizEngine events should emit 'done' event on continueQuiz() | passed |
| Utility Methods | QuizEngine class Utility Methods should report if there are more questions | passed |
| Utility Methods | QuizEngine class Utility Methods should reset quiz state | passed |
| Utility Methods | QuizEngine class Utility Methods should return a QuizResultSummary object | passed |
