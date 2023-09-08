const Question = require('../Question.js');

describe(
  "Question class", () => {

    describe(
      "Creating a question object", () => {
        it("should correctly create an new instance", () => {
          const question = new Question("What comes after rain?", ["Snow", "More rain", "Sunshine"], 2);
          expect(question.text).toBe("What comes after rain?");
          expect(question.choices).toStrictEqual(["Snow", "More rain", "Sunshine"]);
          expect(question.correctChoiceIndex).toBe(2);
        });

        it("should throw type errors for invalid constructor arguments", () => {
          expect(() => {new Question(2, ["Snow", "More rain", "Sunshine"], 2);}).toThrow(TypeError);
          expect(() => {new Question("What comes after rain?", "Wrong argument", 0)}).toThrow(TypeError);
          expect(()=> {new Question("What comes after rain?", ["Snow", "More rain", "Sunshine"], "invalid")}).toThrow(TypeError);
          expect(()=> {new Question("What comes after rain?", ["Snow", "More rain", "Sunshine"], -1)}).toThrow(RangeError);
          expect(()=> {new Question("What comes after rain?", ["Snow", "More rain", "Sunshine"], 10)}).toThrow(RangeError);
        })
      });

      describe(
        "Using getters and setters", () => {
          it("should correctly be able to set new values and getting them correctly", () => {
            const question = new Question("What comes after rain?", ["Snow", "More rain", "Sunshine"], 2);
            question.text = "New text";
            question.choices = ["Option1", "Option2", "Option3"];
            question.correctChoiceIndex = 1;
            expect(question.text).toBe("New text");
            expect(question.choices).toStrictEqual(["Option1", "Option2", "Option3"]);
            expect(question.correctChoiceIndex).toBe(1);
          })

          it("should not be possible to set invalid types through setters", () => {
            const question = new Question("What comes after rain?", ["Snow", "More rain", "Sunshine"], 2);
            expect(() => {question.text = ["Not a string"];}).toThrow(TypeError);
            expect(() => {question.choices = "Not an array";}).toThrow(TypeError);
            expect(() => {question.correctChoiceIndex = "Not a number";}).toThrow(TypeError);
            expect(() => {question.correctChoiceIndex = -1;}).toThrow(RangeError);
            expect(() => {question.correctChoiceIndex = 10;}).toThrow(RangeError);
          })
        }
      )

      



  }
)