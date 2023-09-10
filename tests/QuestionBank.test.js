const QuestionBank = require('../QuestionBank.js');
const Question = require ('../Question.js');

describe("QuestionBank class", () => {
  it("should initialize empty", () => {
    const questionBank = new QuestionBank();
    expect(questionBank.getAllQuestions()).toStrictEqual([]);
    expect(questionBank.hasQuestions()).toBeFalsy();
  })

  describe("addQuestion()", () => {
    it("should add a new Question object to allQuestions", () => {
      const questionBank = new QuestionBank();
      const question = new Question("Is water wet?", ["Yes", "No"], 0);
      questionBank.addQuestion(question);
      expect(questionBank.getAllQuestions()).toStrictEqual([question]);
    })
    it("throws error if passed wrong type of object", () => {
      const questionBank = new QuestionBank();
      expect(() => questionBank.addQuestion("Not a question object!")).toThrow(TypeError);
    })
  });

  describe("createAndAddQuestion()", () => {
    it("should add a new question", () => {
      const questionBank = new QuestionBank();
      questionBank.createAndAddQuestion("Is water wet?", ["Yes", "No"], 0);
      expect(questionBank.getAllQuestions()[0] instanceof Question).toBeTruthy();
      expect(questionBank.getAllQuestions()[0].text).toBe("Is water wet?");
    })
  });

  describe("removeQuestion()", () => {
    it("removes a question with correct arguments", () => {
      const questionBank = new QuestionBank();
      const question = new Question("Does a dog bark?", ["Yes", "No"], 0);
      const question2 = new Question("Does a fish swim", ["Yes", "No"], 1);
      questionBank.addQuestion(question);
      questionBank.addQuestion(question2);
      questionBank.removeQuestion(0);
      expect(questionBank.getAllQuestions()).toStrictEqual([question2]);
    });
    it("throws error with non validated arguments", () => {
      const questionBank = new QuestionBank();
      expect(() => questionBank.removeQuestion("im a string")).toThrow(TypeError);
      expect(() => questionBank.removeQuestion(1)).toThrow(RangeError);
    });
  });

  describe("getQuestion()", () => {
    it("returns a question a correct index to get", () => {
      const questionBank = new QuestionBank();
      const question = new Question("Is coding the best?", ["Yes", "No"], 0);
      questionBank.addQuestion(question);
      expect(questionBank.getQuestion(0)).toStrictEqual(question);
    });

    it("should throw an error with invalid arguments", () => {
      const questionBank = new QuestionBank();
      expect(() => questionBank.getQuestion("Im a string")).toThrow(TypeError);
      expect(() => questionBank.getQuestion(1)).toThrow(RangeError);
    });
  });

  describe("getAllQuestions()", () => {
    it("should work with Question objects stored", () => {
      const questionBank = new QuestionBank();
      const question = new Question("Does cat say meow?", ["Yes", "No"], 0);
      const question2 = new Question("Does birds fly?", ["Yes", "No", "Maybe"], 2);
      questionBank.addQuestion(question);
      questionBank.addQuestion(question2);
      expect(questionBank.getAllQuestions()).toStrictEqual([question, question2]);
    });
    it("should work with no Question objects stored", () => {
      const questionBank = new QuestionBank();
      expect(questionBank.getAllQuestions()).toStrictEqual([]);
    })
  });

  describe("hasQuestions()", () => {
    it("should return true when question exists", () => {
      const questionBank = new QuestionBank();
      const question = new Question("Is testing fun?", ["Yes", "No"], 0);
      questionBank.addQuestion(question);
      expect(questionBank.hasQuestions()).toBeTruthy();
    });
    it("should return false when no questions exists", () => {
      const questionBank = new QuestionBank();
      expect(questionBank.hasQuestions()).toBeFalsy();
    })
  })

})