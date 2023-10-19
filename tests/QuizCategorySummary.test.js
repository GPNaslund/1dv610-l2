import QuizCategorySummary from "../src/QuizCategorySummary";
import InvalidQuestionCountError from '../src/errors/InvalidQuestionCountError.js';
import InvalidCorrectAnswerCountError from '../src/errors/InvalidCorrectAnswerCountError.js';

describe("QuizCategorySummary class", () => {
    let summary;

    const createSummary = (category = "History", totalQuestions = 10, correctAnswers = 8) => {
        return new QuizCategorySummary(category, totalQuestions, correctAnswers);
    };

    beforeEach(() => {
        summary = createSummary();
    });

    describe("constructor()", () => {
        it("should initialize successfully", () => {
            expect(summary.nameOfCategory).toBe("History");
            expect(summary.amountOfQuestions).toBe(10);
            expect(summary.amountOfCorrectAnswers).toBe(8);
            expect(summary.percentageOfCorrectAnswers).toBe(80.00);
        });

        it("should throw error for invalid question count", () => {
            expect(() => createSummary("History", 0, 8)).toThrow(InvalidQuestionCountError);
            expect(() => createSummary("History", -10, 8)).toThrow(InvalidQuestionCountError);
        });

        it("should throw error for invalid correct answer count", () => {
            expect(() => createSummary("History", 10, 11)).toThrow(InvalidCorrectAnswerCountError);
            expect(() => createSummary("History", 10, -1)).toThrow(InvalidCorrectAnswerCountError);
        });
    });

    describe("string and array representations", () => {
        const expectedRepresentation = {
            string: "category: History, amount of questions: 10, amount of correct answers: 8, correct percentage: 80%",
            array: [
                "category: History",
                "amount of questions: 10",
                "amount of correct answers: 8",
                "correct percentage: 80%",
            ]
        };

        it("should convert to string", () => {
            expect(summary.toString()).toBe(expectedRepresentation.string);
        });

        it("should convert to array", () => {
            expect(summary.toArray()).toEqual(expectedRepresentation.array);
        });
    });
});
