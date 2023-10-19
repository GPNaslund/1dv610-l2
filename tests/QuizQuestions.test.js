import QuizQuestions from '../src/QuizQuestions.js';
import Question from '../src/Question.js';
import InvalidQuestionTypeError from '../src/errors/InvalidQuestionTypeError.js';
import IndexNotNumberError from '../src/errors/IndexNotNumberError.js';
import IndexOutOfBoundsError from '../src/errors/IndexOutOfBoundsError.js';

describe("QuizQuestions class", () => {
  let quizQuestions;

  beforeEach(() => {
    quizQuestions = new QuizQuestions();
  });

  describe("constructor()", () => {
    it("should initialize empty", () => {
      expect(quizQuestions.getAllQuestions()).toStrictEqual([]);
      expect(quizQuestions.hasQuestions()).toBeFalsy();
    });
  });

  describe("Question manipulation", () => {
    let question1, question2;

    beforeEach(() => {
      question1 = new Question({ text: "Does a dog bark?", choices: ["Yes", "No"], correctChoice: "Yes" });
      question2 = new Question({ text: "Does a fish swim?", choices: ["Yes", "No"], correctChoice: "Yes" });
    });

    describe("addQuestion()", () => {
      it("should add a new Question object to allQuestions", () => {
        quizQuestions.addQuestion(question1);
        expect(quizQuestions.getAllQuestions()).toStrictEqual([question1]);
      });

      it("throws error if passed wrong type of object", () => {
        expect(() => quizQuestions.addQuestion("Not a question object!")).toThrow(InvalidQuestionTypeError);
      });
    });

    describe("createAndAddQuestion()", () => {
      it("should add a new question", () => {
        quizQuestions.createAndAddQuestion({ text: "Is water wet?", choices: ["Yes", "No"], correctChoice: "Yes" });
        expect(quizQuestions.getAllQuestions()[0] instanceof Question).toBeTruthy();
        expect(quizQuestions.getAllQuestions()[0].text).toBe("Is water wet?");
      });
    });

    describe("removeQuestion()", () => {
      beforeEach(() => {
        quizQuestions.addQuestion(question1);
        quizQuestions.addQuestion(question2);
      });

      it("removes a question with correct arguments", () => {
        quizQuestions.removeQuestion(0);
        expect(quizQuestions.getAllQuestions()).toStrictEqual([question2]);
      });
    });

    describe("getQuestion()", () => {
      beforeEach(() => {
        quizQuestions.addQuestion(question1);
      });

      it("returns a question at the correct index", () => {
        expect(quizQuestions.getQuestion(0)).toStrictEqual(question1);
      });
    });

    describe("getAllQuestions()", () => {
      it("should work with no Question objects stored", () => {
        expect(quizQuestions.getAllQuestions()).toStrictEqual([]);
      });

      it("should work with Question objects stored", () => {
        quizQuestions.addQuestion(question1);
        quizQuestions.addQuestion(question2);
        expect(quizQuestions.getAllQuestions()).toStrictEqual([question1, question2]);
      });
    });

    describe("hasQuestions()", () => {
      it("should return true when questions exist", () => {
        quizQuestions.addQuestion(question1);
        expect(quizQuestions.hasQuestions()).toBeTruthy();
      });

      it("should return false when no questions exist", () => {
        expect(quizQuestions.hasQuestions()).toBeFalsy();
      });
    });
  });

  describe("Error handling", () => {
    describe("removeQuestion() errors", () => {
      it("throws error with non-validated arguments", () => {
        expect(() => quizQuestions.removeQuestion("I'm a string")).toThrow(IndexNotNumberError);
        expect(() => quizQuestions.removeQuestion(1)).toThrow(IndexOutOfBoundsError);
      });
    });

    describe("getQuestion() errors", () => {
      it("should throw an error with invalid arguments", () => {
        expect(() => quizQuestions.getQuestion("I'm a string")).toThrow(IndexNotNumberError);
        expect(() => quizQuestions.getQuestion(1)).toThrow(IndexOutOfBoundsError);
      });
    });
  });
});
