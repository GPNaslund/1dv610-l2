import QuizResultSummary from '../src/QuizResultSummary.js';
import QuizCategorySummary from '../src/QuizCategorySummary.js';
import InvalidPlayerNameError from '../src/errors/InvalidPlayerNameError.js';
import InvalidScoreTypeError from '../src/errors/InvalidScoreTypeError.js';
import InvalidCategorySummaryTypeError from '../src/errors/InvalidCategorySummaryTypeError.js';

describe("QuizResultSummary class", () => {
  describe("constructor()", () => {
    it("should initialize successfully with valid arguments", () => {
      const summary = new QuizResultSummary("TestPerson", 0);
      expect(summary.playerName).toBe("TestPerson");
      expect(summary.score).toBe(0);
      expect(summary.allCategorySummaries.length).toBe(0);
    });

    it("should throw Errors on invalid arguments", () => {
      expect(() => new QuizResultSummary("", 0)).toThrow(InvalidPlayerNameError);
      expect(() => new QuizResultSummary(123, 0)).toThrow(InvalidPlayerNameError);
      expect(() => new QuizResultSummary("TestPerson", "100")).toThrow(InvalidScoreTypeError);
    });

  });

  describe("addCategorySummary()", () => {
    it("should add a QuizCategorySummary successfully", () => {
      const summary = new QuizResultSummary("TestPerson", 0);
      const categorySummary = new QuizCategorySummary("History", 10, 8);
      summary.addCategorySummary(categorySummary);
      expect(summary.allCategorySummaries[0]).toBe(categorySummary);
    });

    it("should throw InvalidCategorySummaryTypeError if argument is not a QuizCategorySummary", () => {
      const summary = new QuizResultSummary("TestPerson", 0);
      expect(() => summary.addCategorySummary("Not a QuizCategorySummary")).toThrow(InvalidCategorySummaryTypeError);
      expect(() => summary.addCategorySummary({})).toThrow(InvalidCategorySummaryTypeError);
    });
  });

  describe("toString()", () => {
    it("should return a string representation", () => {
      const quizResultSummary = new QuizResultSummary("TestPerson", 100);
      const computerScienceSummary = new QuizCategorySummary("Computer Science", 10, 5);
      const animalsSummary = new QuizCategorySummary("Animals", 20, 0);
      quizResultSummary.addCategorySummary(computerScienceSummary);
      quizResultSummary.addCategorySummary(animalsSummary);

      const expectedString = "playerName: TestPerson, score: 100, - category: Computer Science,   - amount of questions: 10,   - amount of correct answers: 5,   - correct percentage: 50%, - category: Animals,   - amount of questions: 20,   - amount of correct answers: 0,   - correct percentage: 0%";
      expect(quizResultSummary.toString()).toBe(expectedString);
    });
  });

  describe("toArray()", () => {
    it("should return an array with strings containing representation", () => {
      const quizResultSummary = new QuizResultSummary("TestPerson", 100);
      const computerScienceSummary = new QuizCategorySummary("Computer Science", 10, 5);
      const animalsSummary = new QuizCategorySummary("Animals", 20, 0);
      quizResultSummary.addCategorySummary(computerScienceSummary);
      quizResultSummary.addCategorySummary(animalsSummary);

      const expectedArray = [
        "playerName: TestPerson",
        "score: 100",
        "- category: Computer Science",
        "  - amount of questions: 10",
        "  - amount of correct answers: 5",
        "  - correct percentage: 50%",
        "- category: Animals",
        "  - amount of questions: 20",
        "  - amount of correct answers: 0",
        "  - correct percentage: 0%"
      ];

      expect(quizResultSummary.toArray()).toEqual(expectedArray);
    });
  });
});
