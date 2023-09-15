import QuizEngine from '../QuizEngine.js';
import QuestionBank from '../QuestionBank.js';

describe("QuizEngine class", () => {
  let quizEngine;
  let questionBank;

  beforeEach(() => {
    questionBank = new QuestionBank();
    questionBank.createAndAddQuestion({text: "Is this a String?", choices: ["Yes", "No"], correctChoice: "Yes"});
    questionBank.createAndAddQuestion({text: "Is this a number?", choices: ["Yes", "No"], correctChoice: "No"});
    quizEngine = new QuizEngine(questionBank, "TestPerson");
  });

  describe("constructor()", () => {
    it("should create an instance successfully", () => {
      expect(quizEngine).toBeDefined();
    })
    it("should throw error if not provided correct arguments", () => {
      expect(() => new QuizEngine().toThrow(TypeError));
      expect(() => new QuizEngine(questionBank).toThrow(TypeError));
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
      quizEngine.answerQuestion(0);
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
      quizEngine.answerQuestion(1);
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
    
  })

})