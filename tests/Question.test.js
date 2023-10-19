import Question from '../src/Question.js';
import InvalidQuestionChoiceError from '../src/errors/InvalidQuestionChoiceError.js';
import InvalidQuestionCategoryError from '../src/errors/InvalidQuestionCategoryError.js';

describe("Question class", () => {
  
  describe("constructor()", () => {
    it("should correctly create a new instance", () => {
      const question = new Question({
        text: "What comes after rain?",
        choices: ["Snow", "More rain", "Sunshine"],
        correctChoice: "Sunshine",
        category: "Weather"
      });
      expect(question.text).toBe("What comes after rain?");
      expect(question.choices).toStrictEqual(["Snow", "More rain", "Sunshine"]);
      expect(question.correctChoice).toBe("Sunshine");
      expect(question.category).toBe("Weather");
    });

    it("should throw errors for invalid constructor arguments", () => {
      expect(() => {
        new Question({
          text: 2,
          choices: ["Snow", "More rain", "Sunshine"],
          correctChoice: "Sunshine"
        });
      }).toThrow(TypeError);
    
      expect(() => {
        new Question({
          text: undefined,
          choices: ["Snow", "More rain", "Sunshine"],
          correctChoice: "Sunshine"
        });
      }).toThrow(TypeError);

      expect(() => {
        new Question({
          text: "What comes after rain?",
          choices: "Wrong argument",
          correctChoice: "Sunshine"
        });
      }).toThrow(InvalidQuestionChoiceError);
    
      expect(() => {
        new Question({
          text: "What comes after rain?",
          choices: ["Snow", 2, "Sunshine"],
          correctChoice: "Sunshine"
        });
      }).toThrow(TypeError);
    
      expect(() => {
        new Question({
          text: "What comes after rain?",
          choices: ["Snow", "More rain", "Sunshine"],
          correctChoice: 0
        });
      }).toThrow(TypeError);
    

      expect(() => {
        new Question({
          text: "What comes after rain?",
          choices: ["Snow", "More rain", "Sunshine"],
          correctChoice: ""
        });
      }).toThrow(RangeError);
    
      expect(() => {
        new Question({
          text: "What comes after rain?",
          choices: ["Snow", "More rain", "Sunshine"],
          correctChoice: "Sunshine",
          category: ""
        });
      }).toThrow(InvalidQuestionCategoryError);
    });
    

  });

});