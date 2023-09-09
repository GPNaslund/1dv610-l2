const QuestionBank = require('../QuestionBank.js');
const Question = require ('../Question.js');

describe("QuestionBank class", () => {
  it("should initialize empty", () => {
    const questionBank = new QuestionBank();
    expect(questionBank.getAllQuestions()).toStrictEqual([]);
    expect(questionBank.hasQuestions()).toBeFalsy();
  })

  describe("should be able to add an Option to the bank", () => {
    it("via addQuestion()", () => {
      const questionBank = new QuestionBank();
      const question = new Question("Is water wet?", ["Yes", "No"], 0);
      questionBank.addQuestion(question);
      expect(questionBank.getAllQuestions()).toStrictEqual([question]);
    })
    it("via addQuestion(), but throws error if passed wrong type of object", () => {
      const questionBank = new QuestionBank();
      expect(() => questionBank.addQuestion("Not a question object!")).toThrow(TypeError);
    })
    it("via createAndAddQuestion()", () => {
      const questionBank = new QuestionBank();
      questionBank.createAndAddQuestion("Is water wet?", ["Yes", "No"], 0);
      expect(questionBank.getAllQuestions()[0] instanceof Question).toBeTruthy();
      expect(questionBank.getAllQuestions()[0].text).toBe("Is water wet?");
    });
  });

  describe("should be able to remove a question via removeQuestion()", () => {
    it("works successfully with correct usage", () => {
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

  describe("Should be able to get a question via getQuestion()", () => {
    it("works when provided a correct index to get", () => {
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

  describe("should return all the questions via getAllQuestions()", () => {
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

  describe("should return a boolean indicating existence of stored question objects via hasQuestions()", () => {
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