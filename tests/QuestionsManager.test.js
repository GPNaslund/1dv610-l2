import QuestionsManager from '../QuestionsManager.js';
import QuestionBank from '../QuestionBank.js';
import Question from '../Question.js';

describe("QuestionsManager class", () => {
  let questionBank;
  let questionsManager;

  beforeEach(() => {
    const q1 = new Question("Is the sky blue?", ["Yes", "No", "Sometimes"], 2);
    const q2 = new Question("Is there clouds in the sky?", ["Yes", "No"], 0);
    const q3 = new Question("Does a dog bark?", ["Yes", "No"], 0);
    const q4 = new Question("Is music sound?", ["Yes", "No"], 0);
    const q5 = new Question("Do you get wet in rain?", ["Yes", "No"], 0);

    questionBank = new QuestionBank();
    questionBank.addQuestion(q1);
    questionBank.addQuestion(q2);
    questionBank.addQuestion(q3);
    questionBank.addQuestion(q4);
    questionBank.addQuestion(q5);


    questionsManager = new QuestionsManager(questionBank);
  });

  it("should initialize successfully", () => {
    expect(questionsManager.getFirstQuestion().text).toBe("Is the sky blue?");
    expect(questionsManager.getNextQuestion().choices).toStrictEqual(["Yes", "No"]);
  })

  describe("hasMoreQuestions()", () => {
    it("should return true if more questions are available", () => {
      expect(questionsManager.hasMoreQuestions()).toBeTruthy();
      questionsManager.getNextQuestion();
      questionsManager.getNextQuestion();
      questionsManager.getNextQuestion();
      questionsManager.getNextQuestion();
      expect(questionsManager.hasMoreQuestions()).toBeFalsy();
    })
  });

  describe("getNextQuestion()", () => {
    it("should advance currentIndex and return the question at that index", () => {
      expect(questionsManager.getNextQuestion().text).toBe("Is there clouds in the sky?");
      questionsManager.getNextQuestion();
      questionsManager.getNextQuestion();
      questionsManager.getNextQuestion();
      expect(questionsManager.hasMoreQuestions()).toBeFalsy();
    });
  });

  describe("isAnswerCorrect()", () => {
    it("should return true if provided the correct index", () => {
      expect(questionsManager.isAnswerCorrect(2)).toBeTruthy();
    });
    it("should return false if provided the wrong index", () => {
      expect(questionsManager.isAnswerCorrect(1)).toBeFalsy();
    })
    it("should throw error if arguments are not valid", () => {
      expect(() => questionsManager.isAnswerCorrect("Im a string").toThrow(TypeError));
      expect(() => questionsManager.isAnswerCorrect(15).toThrow(RangeError));
    })
  });

  describe("reset()", () => {
    it("should reset the currentIndex to 0", () => {
      const question = questionsManager.getNextQuestion();
      expect(question === questionsManager.getNextQuestion()).toBeFalsy();
      questionsManager.reset();
      expect(question).toBe(questionsManager.getNextQuestion());
    })
  })
})