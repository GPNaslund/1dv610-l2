import QuestionsManager from '../QuestionsManager.js';
import QuizQuestions from '../QuizQuestions.js';
import Question from '../Question.js';

describe("QuestionsManager class", () => {
  let quizQuestions;
  let questionsManager;

  beforeEach(() => {
    const q1 = new Question({text: "Is the sky blue?", choices: ["Yes", "No", "Sometimes"], correctChoice: "Sometimes"});
    const q2 = new Question({text: "Is there clouds in the sky?", choices: ["Yes", "No"], correctChoice: "Yes"});
    const q3 = new Question({text: "Does a dog bark?", choices: ["Yes", "No"], correctChoice: "Yes"});
    const q4 = new Question({text: "Is music sound?", choices: ["Yes", "No"], correctChoice: "Yes"});
    const q5 = new Question({text: "Do you get wet in rain?", choices: ["Yes", "No"], correctChoice: "Yes"});

    quizQuestions = new QuizQuestions();
    quizQuestions.addQuestion(q1);
    quizQuestions.addQuestion(q2);
    quizQuestions.addQuestion(q3);
    quizQuestions.addQuestion(q4);
    quizQuestions.addQuestion(q5);


    questionsManager = new QuestionsManager(quizQuestions);
  });

  describe("constructor()", () => {
    it("should initialize successfully", () => {
      expect(questionsManager).toBeDefined();
      expect(questionsManager.getQuestion().text).toBe("Is the sky blue?");
    })
  })

  describe("hasMoreQuestions()", () => {
    it("should return true if more questions are available", () => {
      expect(questionsManager.hasMoreQuestions()).toBeTruthy();
      questionsManager.advanceCurrentIndex();
      questionsManager.advanceCurrentIndex();
      questionsManager.advanceCurrentIndex();
      questionsManager.advanceCurrentIndex();
      expect(questionsManager.hasMoreQuestions()).toBeFalsy();
    })
  });

  describe("getQuestion()", () => {
    it("should return the question at the current index", () => {
      expect(questionsManager.getQuestion().text).toBe("Is the sky blue?");
      questionsManager.advanceCurrentIndex();
      expect(questionsManager.getQuestion().text).toBe("Is there clouds in the sky?");
    })
  });

  describe("reset()", () => {
    it("should reset the currentIndex to 0", () => {
      const question = questionsManager.getQuestion();
      questionsManager.advanceCurrentIndex();
      expect(question === questionsManager.getQuestion()).toBeFalsy();
      questionsManager.reset();
      expect(question).toBe(questionsManager.getQuestion());
    })
  })
})