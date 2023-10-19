import Question from '../src/Question.js';
import QuestionResult from '../src/QuestionResult.js';
import InvalidQuestionError from '../src/errors/InvalidQuestionError.js';
import InvalidQuestionChoiceError from '../src/errors/InvalidQuestionChoiceError.js';

describe("QuestionResult class", () => {
    const validQuestion = new Question({
        text: "Is water wet?",
        choices: ["Yes", "No"],
        correctChoice: "Yes"
    });

    describe("constructor()", () => {
        it("should correctly identify the correct answer", () => {
            const correctAnswerResult = new QuestionResult(validQuestion, "Yes");
            expect(correctAnswerResult.wasCorrect).toBe(true);
        });

        it("should correctly identify the incorrect answer", () => {
            const incorrectAnswerResult = new QuestionResult(validQuestion, "No");
            expect(incorrectAnswerResult.wasCorrect).toBe(false);
        });

        const testInvalidQuestionResult = (question, choice, expectedError) => {
            expect(() => new QuestionResult(question, choice)).toThrow(expectedError);
        };

        it("should throw errors for invalid arguments", () => {
            testInvalidQuestionResult("Not a question", "Yes", InvalidQuestionError);
            testInvalidQuestionResult(validQuestion, 2, InvalidQuestionChoiceError);
            testInvalidQuestionResult(validQuestion, "", InvalidQuestionChoiceError);
            testInvalidQuestionResult(validQuestion, "D", InvalidQuestionChoiceError);
        });
    });
});
