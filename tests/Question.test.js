import Question from '../src/Question.js';
import InvalidQuestionChoiceError from '../src/errors/InvalidQuestionChoiceError.js';
import InvalidQuestionCategoryError from '../src/errors/InvalidQuestionCategoryError.js';

describe("Question class", () => {
  
  describe("constructor()", () => {
    const validQuestionData = {
      text: "What comes after rain?",
      choices: ["Snow", "More rain", "Sunshine"],
      correctChoice: "Sunshine",
      category: "Weather"
    };
    
    it("should correctly create a new instance", () => {
      const question = new Question(validQuestionData);
      expect(question.text).toBe(validQuestionData.text);
      expect(question.choices).toStrictEqual(validQuestionData.choices);
      expect(question.correctChoice).toBe(validQuestionData.correctChoice);
      expect(question.category).toBe(validQuestionData.category);
    });

    const testInvalidQuestion = (data, errorType) => {
      expect(() => new Question(data)).toThrow(errorType);
    };

    it("should throw errors for invalid constructor arguments", () => {
      testInvalidQuestion({ ...validQuestionData, text: 2 }, TypeError);
      testInvalidQuestion({ ...validQuestionData, text: undefined }, TypeError);
      testInvalidQuestion({ ...validQuestionData, choices: "Wrong argument" }, InvalidQuestionChoiceError);
      testInvalidQuestion({ ...validQuestionData, choices: ["Snow", 2, "Sunshine"] }, TypeError);
      testInvalidQuestion({ ...validQuestionData, correctChoice: 0 }, TypeError);
      testInvalidQuestion({ ...validQuestionData, correctChoice: "" }, RangeError);
      testInvalidQuestion({ ...validQuestionData, category: "" }, InvalidQuestionCategoryError);
    });
  });
});
