import QuestionBank from '../QuestionBank.js';
import Question from '../Question.js';

describe("QuestionBank class", () => {
  
  it("should initialize empty", () => {
    const questionBank = new QuestionBank();
    expect(questionBank.getAllQuestions()).toStrictEqual([]);
    expect(questionBank.hasQuestions()).toBeFalsy();
  });

  describe("addQuestion()", () => {
    it("should add a new Question object to allQuestions", () => {
      const questionBank = new QuestionBank();
      const question = new Question({ text: "Is water wet?", choices: ["Yes", "No"], correctChoice: "Yes" });
      questionBank.addQuestion(question);
      expect(questionBank.getAllQuestions()).toStrictEqual([question]);
    });

    it("throws error if passed wrong type of object", () => {
      const questionBank = new QuestionBank();
      expect(() => questionBank.addQuestion("Not a question object!")).toThrow(TypeError);
    });
  });

  describe("createAndAddQuestion()", () => {
    it("should add a new question", () => {
      const questionBank = new QuestionBank();
      questionBank.createAndAddQuestion({ text: "Is water wet?", choices: ["Yes", "No"], correctChoice: "Yes" });
      expect(questionBank.getAllQuestions()[0] instanceof Question).toBeTruthy();
      expect(questionBank.getAllQuestions()[0].text).toBe("Is water wet?");
    });
  });

  describe("removeQuestion()", () => {
    it("removes a question with correct arguments", () => {
      const questionBank = new QuestionBank();
      const question = new Question({ text: "Does a dog bark?", choices: ["Yes", "No"], correctChoice: "Yes" });
      const question2 = new Question({ text: "Does a fish swim?", choices: ["Yes", "No"], correctChoice: "Yes" });
      questionBank.addQuestion(question);
      questionBank.addQuestion(question2);
      questionBank.removeQuestion(0);
      expect(questionBank.getAllQuestions()).toStrictEqual([question2]);
    });

    it("throws error with non-validated arguments", () => {
      const questionBank = new QuestionBank();
      expect(() => questionBank.removeQuestion("I'm a string")).toThrow(TypeError);
      expect(() => questionBank.removeQuestion(1)).toThrow(RangeError);
    });
  });

  describe("getQuestion()", () => {
    it("returns a question at the correct index", () => {
      const questionBank = new QuestionBank();
      const question = new Question({ text: "Is coding the best?", choices: ["Yes", "No"], correctChoice: "Yes" });
      questionBank.addQuestion(question);
      expect(questionBank.getQuestion(0)).toStrictEqual(question);
    });

    it("should throw an error with invalid arguments", () => {
      const questionBank = new QuestionBank();
      expect(() => questionBank.getQuestion("I'm a string")).toThrow(TypeError);
      expect(() => questionBank.getQuestion(1)).toThrow(RangeError);
    });
  });

  describe("getAllQuestions()", () => {
    it("should work with Question objects stored", () => {
      const questionBank = new QuestionBank();
      const question = new Question({ text: "Does cat say meow?", choices: ["Yes", "No"], correctChoice: "Yes" });
      const question2 = new Question({ text: "Do birds fly?", choices: ["Yes", "No", "Maybe"], correctChoice: "Yes" });
      questionBank.addQuestion(question);
      questionBank.addQuestion(question2);
      expect(questionBank.getAllQuestions()).toStrictEqual([question, question2]);
    });

    it("should work with no Question objects stored", () => {
      const questionBank = new QuestionBank();
      expect(questionBank.getAllQuestions()).toStrictEqual([]);
    });
  });

  describe("hasQuestions()", () => {
    it("should return true when questions exist", () => {
      const questionBank = new QuestionBank();
      const question = new Question({ text: "Is testing fun?", choices: ["Yes", "No"], correctChoice: "Yes" });
      questionBank.addQuestion(question);
      expect(questionBank.hasQuestions()).toBeTruthy();
    });

    it("should return false when no questions exist", () => {
      const questionBank = new QuestionBank();
      expect(questionBank.hasQuestions()).toBeFalsy();
    });
  });
});
