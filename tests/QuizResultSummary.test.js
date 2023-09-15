import QuizResultSummary from '../QuizResultSummary.js';
import QuizCategorySummary from '../QuizCategorySummary.js';

describe("QuizResultSummary class", () => {
  describe("constructor()", () => {
    it("should initialize successfully", () => {
      const summary = new QuizResultSummary("TestPerson", 0);
      expect(summary.username).toBe("TestPerson");
      expect(summary.score).toBe(0);
      expect(summary.allCategorySummaries.length).toBe(0);
    });
  })

  describe("addCategorySummary()", () => {
    it("should add a QuizCategorySummary successfully", () => {
      const summary = new QuizResultSummary("TestPerson", 0);
      const categorySummary = new QuizCategorySummary("History", 10, 8);
      summary.addCategorySummary(categorySummary);
      expect(summary.allCategorySummaries[0]).toBe(categorySummary);
    });

    it("should throw TypeError if argument is not a QuizCategorySummary", () => {
      const summary = new QuizResultSummary("TestPerson", 0);
      expect(() => summary.addCategorySummary("Not a QuizCategorySummary").toThrow(TypeError));
      expect(() => summary.addCategorySummary({}).toThrow(TypeError));
    })
  })
})