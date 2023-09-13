import QuizResult from '../QuizResult.js';

describe('QuizResult class', () => {

  describe('Creating a QuizResult object', () => {
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
      expect(quizResult.questionResultDetails).toStrictEqual(questionResultObjects);
    });

    it('should throw error if invalid argument is passed', () => {
      expect(() => quizResult.addQuestionResult({questionText: 2})).toThrow(TypeError);
      expect(() => quizResult.addQuestionResult({questionText: ""})).toThrow(RangeError);
      expect(() => quizResult.addQuestionResult({questionText: "Test", questionChoices: "Not an array"})).toThrow(TypeError);
      expect(() => quizResult.addQuestionResult({questionText: "Test", questionChoices: []})).toThrow(RangeError);
      expect(() => quizResult.addQuestionResult({
        questionText: "Test",
        questionChoices: ["Choice1"],
        correctChoice: 1
      })).toThrow(TypeError);
      expect(() => quizResult.addQuestionResult({
        questionText: "Test",
        questionChoices: ["Choice1"],
        correctChoice: ""
      })).toThrow(RangeError);
      expect(() => quizResult.addQuestionResult({
        questionText: "Test",
        questionChoices: ["Choice1"],
        correctChoice: "Choice",
        selectedChoice: 1
      })).toThrow(TypeError);
      expect(() => quizResult.addQuestionResult({
        questionText: "Test",
        questionChoices: ["Choice1"],
        correctChoice: "Choice",
        selectedChoice: ""
      })).toThrow(RangeError);
      expect(() => quizResult.addQuestionResult({
        questionText: "Test",
        questionChoices: ["Choice1"],
        correctChoice: "Choice",
        selectedChoice: "Choice",
        wasCorrect: "Not boolean"
      })).toThrow(TypeError);
      expect(() => quizResult.addQuestionResult({
        questionText: "Test",
        questionChoices: ["Choice1"],
        correctChoice: "Choice",
        selectedChoice: "Choice",
        wasCorrect: true,
        category: 1
      })).toThrow(TypeError);
      expect(() => quizResult.addQuestionResult({
        questionText: "Test",
        questionChoices: ["Choice1"],
        correctChoice: "Choice",
        selectedChoice: "Choice",
        wasCorrect: true,
        category: ""
      })).toThrow(RangeError);
    });

  });

  describe('generateSummary()', () => {
    it('should correctly generate a summary', () => {
      const quizResult = new QuizResult('TestPerson', 0);
      const resultsObjects = generateQuestionResultObjects();
      resultsObjects.forEach(result => quizResult.addQuestionResult(result));
      const generatedSummary = quizResult.generateSummary();
      const expectedSummary = {
        username: "TestPerson",
        score: 0, 
        summary: {
          Category1: {
            category: "Category1",
            questionAmount: 3,
            correctAnswers: 2,
            percentageOfCorrect: 66.67,
          },
          Category2: {
            category: "Category2",
            questionAmount: 3,
            correctAnswers: 1,
            percentageOfCorrect: 33.33,
          },
          Category3: {
            category: "Category3",
            questionAmount: 4,
            correctAnswers: 0,
            percentageOfCorrect: 0,
          }
        }
      };
      expect(generatedSummary).toEqual(expectedSummary);
    });
  })
});

const generateQuestionResultsForCategory = (category, count, correctAnswerIndex) => {
  const allQuestionResults = [];
  for (let i = 0; i < count; i++) {
    const correctAnswer = correctAnswerIndex.includes(i);
    allQuestionResults.push({
      questionText: "TestResult",
      questionChoices: ["Choice1", "Choice2", "Choice3"],
      correctChoice: "Choice1",
      selectedChoice: correctAnswer ? "Choice1" : "Choice2",
      wasCorrect: correctAnswer,
      category: category,
    });
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