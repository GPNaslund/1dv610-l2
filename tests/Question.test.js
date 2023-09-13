import Question from '../Question.js';

describe("Question class", () => {
  
  describe("constructor", () => {
    
    it("should correctly create a new instance", () => {
      const question = new Question({
        text: "What comes after rain?",
        choices: ["Snow", "More rain", "Sunshine"],
        correctChoiceIndex: 2,
        category: "Weather"
      });
      expect(question.text).toBe("What comes after rain?");
      expect(question.choices).toStrictEqual(["Snow", "More rain", "Sunshine"]);
      expect(question.correctChoiceIndex).toBe(2);
      expect(question.category).toBe("Weather");
    });

    it("should throw type errors for invalid constructor arguments", () => {
      expect(() => {new Question({text: 2, choices: ["Snow", "More rain", "Sunshine"], correctChoiceIndex: 2});}).toThrow(TypeError);
      expect(() => {new Question({text: "What comes after rain?", choices: "Wrong argument", correctChoiceIndex: 0});}).toThrow(TypeError);
      expect(() => {new Question({text: "What comes after rain?", choices: ["Snow", "More rain", "Sunshine"], correctChoiceIndex: "invalid"});}).toThrow(TypeError);
      expect(() => {new Question({text: "What comes after rain?", choices: ["Snow", "More rain", "Sunshine"], correctChoiceIndex: -1});}).toThrow(RangeError);
      expect(() => {new Question({text: "What comes after rain?", choices: ["Snow", "More rain", "Sunshine"], correctChoiceIndex: 10});}).toThrow(RangeError);
    });

  });

});