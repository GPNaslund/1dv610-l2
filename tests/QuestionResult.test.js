import Question from '../Question.js';
import QuestionResult from '../QuestionResult.js';

describe("QuestionResult class", () => {
  let question;

  beforeAll(() => {
    question = new Question({ text: "Is water wet?", choices: ["Yes", "No"], correctChoice: "Yes"});
  })

  it("should initializes successfully", () => {
    const result = new QuestionResult(question, "Yes");
    expect(result.wasCorrect).toBe(true);
    const result2 = new QuestionResult(question, "No");
    expect(result2.wasCorrect).toBe(false);
  });

  it("should throw error on invalid argument", () => {
    expect(() => new QuestionResult("Not a question", "Yes").toThrowError(TypeError));
    expect(() => new QuestionResult(question, 2).toThrowError(TypeError));
    expect(() => new QuestionResult(question, "").toThrowError(RangeError));
  })
})