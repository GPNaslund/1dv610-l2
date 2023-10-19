import QuizCategorySummary from "../src/QuizCategorySummary";
import InvalidQuestionCountError from '../src/errors/InvalidQuestionCountError.js';
import InvalidCorrectAnswerCountError from '../src/errors/InvalidCorrectAnswerCountError.js';


describe("QuizCategorySummary class", () => {
  let summary;

  beforeEach(() => {
    summary = new QuizCategorySummary("History", 10, 8);
  })
  describe("constructor()", () => {
    it("should initialize successfully", () => {
      expect(summary.nameOfCategory).toBe("History");
      expect(summary.amountOfQuestions).toBe(10);
      expect(summary.amountOfCorrectAnswers).toBe(8);
      expect(summary.percentageOfCorrectAnswers).toBe(80.00);
    })

    it("should throw errors for invalid constructor arguments", () => {
      expect(() => new QuizCategorySummary("History", 0, 8)).toThrow(InvalidQuestionCountError);
      expect(() => new QuizCategorySummary("History", -10, 8)).toThrow(InvalidQuestionCountError);
      expect(() => new QuizCategorySummary("History", 10, 11)).toThrow(InvalidCorrectAnswerCountError);
      expect(() => new QuizCategorySummary("History", 10, -1)).toThrow(InvalidCorrectAnswerCountError);
    });

  });

  describe("toString()", () => {
    it("should return a string representation", () => {
      const expectedString = "category: History, amount of questions: 10, amount of correct answers: 8, correct percentage: 80%";
      expect(summary.toString()).toBe(expectedString);
    })
  })

  describe("toArray()", () => {
    it("should return an array containing strings with the summary representation", () => {
      const expectedArray = [
        "category: History", 
        "amount of questions: 10",
        "amount of correct answers: 8",
        "correct percentage: 80%",
      ];
      expect(summary.toArray()).toEqual(expectedArray);
    })
  })
})