import QuizEngine from '../src/QuizEngine.js';
import QuizQuestions from '../src/QuizQuestions.js';

describe("QuizEngine class", () => {
  let quizEngine;
  let quizQuestions;

  beforeEach(() => {
    quizQuestions = new QuizQuestions();
    quizQuestions.createAndAddQuestion({text: "Is this a String?", choices: ["Yes", "No"], correctChoice: "Yes"});
    quizQuestions.createAndAddQuestion({text: "Is this a number?", choices: ["Yes", "No"], correctChoice: "No"});
    quizEngine = new QuizEngine(quizQuestions, "TestPerson");
  });

  describe("constructor()", () => {
    it("should create an instance successfully", () => {
      expect(quizEngine).toBeDefined();
    })
    it("should throw error if not provided correct arguments", () => {
      expect(() => new QuizEngine().toThrow(TypeError));
      expect(() => new QuizEngine(quizQuestions).toThrow(TypeError));
      expect(() => new QuizEngine("TestPerson").toThrow(TypeError));
    })
  });

  describe("startQuiz()", () => {
    it("should emit 'question' event containing the text and choices data", () => {
      let text;
      let choices;

      quizEngine.on('question', (data) => {
        text = data.text;
        choices = data.choices;
      });

      quizEngine.startQuiz();
      expect(text).toBe("Is this a String?");
      expect(choices).toStrictEqual(["Yes", "No"]);
    });
  });

  describe("answerQuestion(answer)", () => {
    it("should emit 'correct' event if answer is correct, with playername and player score data", () => {
      let playerName;
      let score;
      quizEngine.on('correct', (data) => {
        playerName = data.playerName;
        score = data.score;
      });
      quizEngine.answerQuestion("Yes");
      expect(playerName).toBe("TestPerson");
      expect(score).toBe(1);
      quizEngine.resetQuiz();
    });

    it("should emit 'false' event if answer is incorrect, with playername and player score data", () => {
      let playerName;
      let score;
      quizEngine.on('false', (data) => {
        playerName = data.playerName;
        score = data.score;
      });
      quizEngine.answerQuestion("No");
      expect(playerName).toBe("TestPerson");
      expect(score).toBe(0);
    });
  });

  describe("continueQuiz()", () => {
    it("if more questions, should advance index by one and emit question event", () => {
      let text;
      let choices;
      quizEngine.on('question', (data) => {
        text = data.text;
        choices = data.choices;
      });
      quizEngine.continueQuiz();
      expect(text).toBe("Is this a number?");
      expect(choices).toStrictEqual(["Yes", "No"]);
    });

    it("if no more questions, should emit 'done' event with playername and player score data", () => {
      quizEngine.on('done', (data) => {        
        expect(data.playerName).toBe("TestPerson");
        expect(data.score).toBe(0);
      });

      quizEngine.continueQuiz();
      quizEngine.continueQuiz();
    });
  });

  describe("hasMoreQuestions()", () => {
    it("should return true if there are more questions", () => {
      expect(quizEngine.hasMoreQuestions()).toBe(true);
    });

    it("should return false if there are no more questions", () => {
      quizEngine.continueQuiz();
      quizEngine.continueQuiz();
      expect(quizEngine.hasMoreQuestions()).toBe(false);
    });

    it("should return true after a reset, even if previously false", () => {
      quizEngine.continueQuiz();
      quizEngine.continueQuiz();
      quizEngine.resetQuiz(); 
      expect(quizEngine.hasMoreQuestions()).toBe(true);
    });
  });

  describe("getSummary()", () => {
    it("should return a QuizResultSummary object", async () => {
      const summary = await quizEngine.getSummary();
      expect(summary).toBeDefined();
      expect(summary).toHaveProperty("playerName");
      expect(summary).toHaveProperty("score");
      expect(summary).toHaveProperty("allCategorySummaries");
    });

    it("should return summary data based on answers", async () => {
      quizEngine.answerQuestion("Yes");
      const summary = await quizEngine.getSummary();
      expect(summary.allCategorySummaries.length).toBe(1);
      const categorySummary = summary.allCategorySummaries[0];
      expect(categorySummary.amountOfCorrectAnswers).toBe(1);
      expect(categorySummary.amountOfQuestions).toBe(1);
    })
  })

})