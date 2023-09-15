import QuizCategorySummary from "../QuizCategorySummary";

describe("QuizCategorySummary class", () => {
  describe("constructor()", () => {
    it("should initialize successfully", () => {
      const summary = new QuizCategorySummary("History", 10, 8);
      expect(summary.nameOfCategory).toBe("History");
      expect(summary.amountOfQuestions).toBe(10);
      expect(summary.amountOfCorrectAnswers).toBe(8);
      expect(summary.percentageOfCorrect).toBe(80.00);
    })
  })
})