import QuizResultSummary from '../src/QuizResultSummary.js';
import QuizCategorySummary from '../src/QuizCategorySummary.js';
import InvalidPlayerNameError from '../src/errors/InvalidPlayerNameError.js';
import InvalidScoreTypeError from '../src/errors/InvalidScoreTypeError.js';
import InvalidCategorySummaryTypeError from '../src/errors/InvalidCategorySummaryTypeError.js';

describe("QuizResultSummary class", () => {
  let quizResultSummary;

  beforeEach(() => {
    quizResultSummary = new QuizResultSummary("TestPerson", 100);
  });

  describe("constructor()", () => {
    it("initializes with valid arguments", () => {
      expect(quizResultSummary.playerName).toBe("TestPerson");
      expect(quizResultSummary.score).toBe(100);
      expect(quizResultSummary.allCategorySummaries.length).toBe(0);
    });

    describe("Error handling", () => {
      it("throws InvalidPlayerNameError for invalid name", () => {
        expect(() => new QuizResultSummary("", 0)).toThrow(InvalidPlayerNameError);
        expect(() => new QuizResultSummary(123, 0)).toThrow(InvalidPlayerNameError);
      });

      it("throws InvalidScoreTypeError for invalid score", () => {
        expect(() => new QuizResultSummary("TestPerson", "100")).toThrow(InvalidScoreTypeError);
      });
    });
  });

  describe("addCategorySummary()", () => {
    let categorySummary;

    beforeEach(() => {
      categorySummary = new QuizCategorySummary("History", 10, 8);
    });

    it("adds a QuizCategorySummary", () => {
      quizResultSummary.addCategorySummary(categorySummary);
      expect(quizResultSummary.allCategorySummaries[0]).toBe(categorySummary);
    });

    it("throws error when adding a non-QuizCategorySummary", () => {
      expect(() => quizResultSummary.addCategorySummary("Not a QuizCategorySummary")).toThrow(InvalidCategorySummaryTypeError);
      expect(() => quizResultSummary.addCategorySummary({})).toThrow(InvalidCategorySummaryTypeError);
    });
  });

  describe("toString()", () => {
    it("returns string representation of summary", () => {
      const computerScienceSummary = new QuizCategorySummary("Computer Science", 10, 5);
      const animalsSummary = new QuizCategorySummary("Animals", 20, 0);
      quizResultSummary.addCategorySummary(computerScienceSummary);
      quizResultSummary.addCategorySummary(animalsSummary);

      const expectedString = "playerName: TestPerson, score: 100, - category: Computer Science,   - amount of questions: 10,   - amount of correct answers: 5,   - correct percentage: 50%, - category: Animals,   - amount of questions: 20,   - amount of correct answers: 0,   - correct percentage: 0%";
      expect(quizResultSummary.toString()).toBe(expectedString);
    });
  });

  describe("toArray()", () => {
    it("returns array representation of summary", () => {
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
