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
    })
  })
})