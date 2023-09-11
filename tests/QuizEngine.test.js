import QuizEngine from '../QuizEngine.js';
import Scoreboard from '../Scoreboard.js';
import QuestionBank from '../QuestionBank.js';

describe("QuizEngine class", () => {
  let scoreboard;
  let quizEngine;
  let questionBank;
  let config = {};

  beforeEach(() => {
    questionBank = new QuestionBank();
    questionBank.createAndAddQuestion("Is this a String?", ["Yes", "No"], 0);
    questionBank.createAndAddQuestion("Is this a number?", ["Yes", "No"], 1);
    scoreboard = new Scoreboard("Tester");
    quizEngine = new QuizEngine(questionBank, scoreboard, config);
  });

  describe("constructor()", () => {
    it("should create an instance successfully", () => {
      expect(quizEngine).toBeDefined();
    })
    it("should throw error if not provided correct arguments", () => {
      expect(() => new QuizEngine().toThrow(TypeError));
      expect(() => new QuizEngine(scoreboard).toThrow(TypeError));
      expect(() => new QuizEngine(questionBank).toThrow(TypeError));
    })
  });

  describe("onQuizStart()", () => {
    it("should start the quiz and call onQuizStart if provided", () => {
      config.onQuizStart = jest.fn();
      quizEngine.startQuiz();
      expect(config.onQuizStart).toHaveBeenCalledWith("Is this a String?", ["Yes", "No"]);
    });
  });

  describe("onCorrectAnswer()", () => {
    it("should call onCorrectAnswer if present in config and call addPoints() on right answer", () => {
      config.onCorrectAnswer = jest.fn();
      quizEngine.answerQuestion(0);
      expect(config.onCorrectAnswer).toHaveBeenCalledWith();
      expect(scoreboard.score).toBe(1);
    });
    it("should call onFalseAnswer if present in config on false answer", () => {
      config.onFalseAnswer = jest.fn();
      quizEngine.answerQuestion(1);
      expect(config.onFalseAnswer).toHaveBeenCalledWith();
    })
  });

  describe("nextQuestion()", () => {
    it("should call onNextQuestion if present in config and if there are more questions left", () => {
      config.onNextQuestion = jest.fn();
      quizEngine.nextQuestion();
      expect(config.onNextQuestion).toHaveBeenCalledWith("Is this a number?", ["Yes", "No"]);
    });
    it("should call onQuizDone if present in config and there are no more questions left", () => {
      config.onQuizDone = jest.fn();
      quizEngine.nextQuestion();
      quizEngine.nextQuestion();
      expect(config.onQuizDone).toHaveBeenCalledWith();
    })
  })

})