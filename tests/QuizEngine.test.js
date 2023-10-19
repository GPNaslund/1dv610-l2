import QuizEngine from '../src/QuizEngine.js';
import QuizQuestions from '../src/QuizQuestions.js';
import InvalidPlayerNameError from '../src/errors/InvalidPlayerNameError.js';
import InvalidQuizQuestionsError from '../src/errors/InvalidQuizQuestionsError.js';

describe("QuizEngine class", () => {
  let quizEngine;
  let quizQuestions;

  beforeEach(() => {
    quizQuestions = new QuizQuestions();
    quizQuestions.createAndAddQuestion({ text: "Is this a String?", choices: ["Yes", "No"], correctChoice: "Yes" });
    quizQuestions.createAndAddQuestion({ text: "Is this a number?", choices: ["Yes", "No"], correctChoice: "No" });
    quizEngine = new QuizEngine(quizQuestions, "TestPerson");
  });

  describe("constructor()", () => {
    it("should create an instance successfully", () => {
      expect(quizEngine).toBeDefined();
    });

    const testInvalidConstructorArgs = (questions, name, errorType) => {
      expect(() => new QuizEngine(questions, name)).toThrow(errorType);
    };

    it("should throw errors for invalid constructor arguments", () => {
      testInvalidConstructorArgs(undefined, undefined, InvalidQuizQuestionsError);
      testInvalidConstructorArgs(quizQuestions, undefined, InvalidPlayerNameError);
      testInvalidConstructorArgs(undefined, "TestPerson", InvalidQuizQuestionsError);
      testInvalidConstructorArgs({}, "TestPerson", InvalidQuizQuestionsError);
      testInvalidConstructorArgs(quizQuestions, 123, InvalidPlayerNameError);
      testInvalidConstructorArgs(quizQuestions, "", InvalidPlayerNameError);
      testInvalidConstructorArgs(quizQuestions, "     ", InvalidPlayerNameError);
    });
  });

 
  describe("QuizEngine events", () => {
    it("should emit 'question' event on startQuiz()", () => {
      let emittedData;
      quizEngine.on('question', (data) => {
        emittedData = data;
      });
      quizEngine.startQuiz();
      expect(emittedData.text).toBe("Is this a String?");
      expect(emittedData.choices).toStrictEqual(["Yes", "No"]);
    });
  
    it("should emit 'correct' event if answer is correct", () => {
      let emittedData;
      quizEngine.on('correct', (data) => {
        emittedData = data;
      });
      quizEngine.answerQuestion("Yes");
      expect(emittedData.playerName).toBe("TestPerson");
      expect(emittedData.score).toBe(1);
    });
  
    it("should emit 'false' event if answer is incorrect", () => {
      let emittedData;
      quizEngine.on('false', (data) => {
        emittedData = data;
      });
      quizEngine.answerQuestion("No");
      expect(emittedData.playerName).toBe("TestPerson");
      expect(emittedData.score).toBe(0);
    });
  
    it("should emit 'question' event on continueQuiz()", () => {
      let emittedData;
      quizEngine.on('question', (data) => {
        emittedData = data;
      });
      quizEngine.continueQuiz();
      expect(emittedData.text).toBe("Is this a number?");
      expect(emittedData.choices).toStrictEqual(["Yes", "No"]);
    });
  
    it("should emit 'done' event on continueQuiz()", done => {
      quizEngine.on('done', (data) => {
        try {
          expect(data.playerName).toBe("TestPerson");
          expect(data.score).toBe(1);
          done();
        } catch (error) {
          done(error);
        }
      });
      quizEngine.answerQuestion("Yes");
      quizEngine.continueQuiz();
      quizEngine.continueQuiz();
    });
  });


  describe("Utility Methods", () => {
    it("should report if there are more questions", () => {
      expect(quizEngine.hasMoreQuestions()).toBe(true);
      quizEngine.continueQuiz();
      quizEngine.continueQuiz();
      expect(quizEngine.hasMoreQuestions()).toBe(false);
    });

    it("should reset quiz state", () => {
      quizEngine.continueQuiz();
      quizEngine.continueQuiz();
      quizEngine.resetQuiz();
      expect(quizEngine.hasMoreQuestions()).toBe(true);
    });

    it("should return a QuizResultSummary object", async () => {
      const summary = await quizEngine.getSummary();
      expect(summary).toMatchObject({
        playerName: "TestPerson",
        score: 0,
        allCategorySummaries: expect.any(Array)
      });
    });
  });
});
