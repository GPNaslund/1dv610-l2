import QuestionResult from '../QuestionResult.js';
import QuizCategorySummary from '../QuizCategorySummary.js';
import QuizResult from '../QuizResult.js';
import Question from '../Question.js';

describe('QuizResult class', () => {

  describe('constructor()', () => {
    it('should successfully be created with correct constructor arguments', () => {
      const quizResult = new QuizResult("TestPerson", 10);
      expect(quizResult).toBeDefined();
    });

    it('should throw error if provided invalid constructor arguments', () => {
      expect(() => new QuizResult(2, 10)).toThrow(TypeError);
      expect(() => new QuizResult("TestPerson", "10")).toThrow(TypeError);
      expect(() => new QuizResult("TestPerson", "Not a number")).toThrow(TypeError);
      expect(() => new QuizResult("", 10)).toThrow(RangeError);
    });
  });

  describe('addQuestionResult()', () => {
    let quizResult;

    beforeEach(() => {
      quizResult = new QuizResult("TestPerson", 0);
    });

    it('should add the questionResult info to #questionResultDetails', () => {
      const questionResultObjects = generateQuestionResultObjects();
      questionResultObjects.forEach(questionResult => {
        quizResult.addQuestionResult(questionResult);
      });
      expect(quizResult.questionResults).toStrictEqual(questionResultObjects);
    });

    it('should throw error if invalid argument is passed', () => {
      expect(() => quizResult.addQuestionResult("Not a QuestionResult object")).toThrow(TypeError);
      expect(() => quizResult.addQuestionResult({})).toThrow(TypeError);
    });

  });

  describe('generateSummary()', () => {
    it('should correctly generate a summary', () => {
      const quizResult = new QuizResult('TestPerson', 0);
      const resultsObjects = generateQuestionResultObjects();
      resultsObjects.forEach(result => quizResult.addQuestionResult(result));
      const quizResultSummary = quizResult.generateSummary();
      const categorySummaries = quizResultSummary.allCategorySummaries;

      const findCategorySummary = (categoryName) => {
        return categorySummaries.find(summary => summary.nameOfCategory === categoryName);
      }
      expect(findCategorySummary("Category1")).toStrictEqual(new QuizCategorySummary("Category1", 3, 2));
      expect(findCategorySummary("Category2")).toStrictEqual(new QuizCategorySummary("Category2", 3, 1));
      expect(findCategorySummary("Category3")).toStrictEqual(new QuizCategorySummary("Category3", 4, 0));
    });
  })
});

const generateQuestionResultsForCategory = (category, count, correctAnswerIndex) => {
  const allQuestionResults = [];
  for (let i = 0; i < count; i++) {
    const correctAnswer = correctAnswerIndex.includes(i);
    const question = new Question({
      text: "TestResult",
      choices: ["Choice1", "Choice2", "Choice3"],
      correctChoice: "Choice1",
      category: category
    });
    const selectedChoice = correctAnswer ? "Choice1" : "Choice2";
    const questionResult = new QuestionResult(question, selectedChoice);
    allQuestionResults.push(questionResult)
  }
  return allQuestionResults;
}


const generateQuestionResultObjects = () => {
  // 10 objects - 3 categories
  // category 1: 3 entries, 2 correct
  // category 2: 3 entries, 1 correct
  // category 4: 4 entries, 0 correct
  const allQuestionResultObjects = [];

  // Category 1
  allQuestionResultObjects.push(...generateQuestionResultsForCategory("Category1", 3, [0, 1]));
  // Category 2
  allQuestionResultObjects.push(...generateQuestionResultsForCategory("Category2", 3, [1]));
  // Category 3
  allQuestionResultObjects.push(...generateQuestionResultsForCategory("Category3", 4, []));

  return allQuestionResultObjects;
}