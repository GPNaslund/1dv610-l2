import QuizQuestions from '../src/QuizQuestions.js';
import Question from '../src/Question.js';

describe("QuizQuestions class", () => {

  describe("constructor()", () => {
    it("should initialize empty", () => {
      const quizQuestions = new QuizQuestions();
      expect(quizQuestions.getAllQuestions()).toStrictEqual([]);
      expect(quizQuestions.hasQuestions()).toBeFalsy();
    });
  })

  describe("addQuestion()", () => {
    it("should add a new Question object to allQuestions", () => {
      const quizQuestions = new QuizQuestions();
      const question = new Question({ text: "Is water wet?", choices: ["Yes", "No"], correctChoice: "Yes" });
      quizQuestions.addQuestion(question);
      expect(quizQuestions.getAllQuestions()).toStrictEqual([question]);
    });

    it("throws error if passed wrong type of object", () => {
      const quizQuestions = new QuizQuestions();
      expect(() => quizQuestions.addQuestion("Not a question object!")).toThrow(TypeError);
    });
  });

  describe("createAndAddQuestion()", () => {
    it("should add a new question", () => {
      const quizQuestions = new QuizQuestions();
      quizQuestions.createAndAddQuestion({ text: "Is water wet?", choices: ["Yes", "No"], correctChoice: "Yes" });
      expect(quizQuestions.getAllQuestions()[0] instanceof Question).toBeTruthy();
      expect(quizQuestions.getAllQuestions()[0].text).toBe("Is water wet?");
    });
  });

  describe("removeQuestion()", () => {
    it("removes a question with correct arguments", () => {
      const quizQuestions = new QuizQuestions();
      const question = new Question({ text: "Does a dog bark?", choices: ["Yes", "No"], correctChoice: "Yes" });
      const question2 = new Question({ text: "Does a fish swim?", choices: ["Yes", "No"], correctChoice: "Yes" });
      quizQuestions.addQuestion(question);
      quizQuestions.addQuestion(question2);
      quizQuestions.removeQuestion(0);
      expect(quizQuestions.getAllQuestions()).toStrictEqual([question2]);
    });

    it("throws error with non-validated arguments", () => {
      const quizQuestions = new QuizQuestions();
      expect(() => quizQuestions.removeQuestion("I'm a string")).toThrow(TypeError);
      expect(() => quizQuestions.removeQuestion(1)).toThrow(RangeError);
    });
  });

  describe("getQuestion()", () => {
    it("returns a question at the correct index", () => {
      const quizQuestions = new QuizQuestions();
      const question = new Question({ text: "Is coding the best?", choices: ["Yes", "No"], correctChoice: "Yes" });
      quizQuestions.addQuestion(question);
      expect(quizQuestions.getQuestion(0)).toStrictEqual(question);
    });

    it("should throw an error with invalid arguments", () => {
      const quizQuestions = new QuizQuestions();
      expect(() => quizQuestions.getQuestion("I'm a string")).toThrow(TypeError);
      expect(() => quizQuestions.getQuestion(1)).toThrow(RangeError);
    });
  });

  describe("getAllQuestions()", () => {
    it("should work with Question objects stored", () => {
      const quizQuestions = new QuizQuestions();
      const question = new Question({ text: "Does cat say meow?", choices: ["Yes", "No"], correctChoice: "Yes" });
      const question2 = new Question({ text: "Do birds fly?", choices: ["Yes", "No", "Maybe"], correctChoice: "Yes" });
      quizQuestions.addQuestion(question);
      quizQuestions.addQuestion(question2);
      expect(quizQuestions.getAllQuestions()).toStrictEqual([question, question2]);
    });

    it("should work with no Question objects stored", () => {
      const quizQuestions = new QuizQuestions();
      expect(quizQuestions.getAllQuestions()).toStrictEqual([]);
    });
  });

  describe("hasQuestions()", () => {
    it("should return true when questions exist", () => {
      const quizQuestions = new QuizQuestions();
      const question = new Question({ text: "Is testing fun?", choices: ["Yes", "No"], correctChoice: "Yes" });
      quizQuestions.addQuestion(question);
      expect(quizQuestions.hasQuestions()).toBeTruthy();
    });

    it("should return false when no questions exist", () => {
      const quizQuestions = new QuizQuestions();
      expect(quizQuestions.hasQuestions()).toBeFalsy();
    });
  });
});
