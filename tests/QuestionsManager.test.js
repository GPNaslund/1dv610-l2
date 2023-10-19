import QuestionsManager from '../src/QuestionsManager.js';
import QuizQuestions from '../src/QuizQuestions.js';
import Question from '../src/Question.js';
import InvalidQuizQuestionsError from '../src/errors/InvalidQuizQuestionsError.js';
import EmptyQuestionBankError from '../src/errors/EmptyQuestionBankError.js';

describe("QuestionsManager class", () => {
    let questionsManager;
    let quizQuestions;

    const setupQuizQuestions = () => {
        const questions = [
            new Question({text: "Is the sky blue?", choices: ["Yes", "No", "Sometimes"], correctChoice: "Sometimes"}),
            new Question({text: "Is there clouds in the sky?", choices: ["Yes", "No"], correctChoice: "Yes"}),
            new Question({text: "Does a dog bark?", choices: ["Yes", "No"], correctChoice: "Yes"}),
            new Question({text: "Is music sound?", choices: ["Yes", "No"], correctChoice: "Yes"}),
            new Question({text: "Do you get wet in rain?", choices: ["Yes", "No"], correctChoice: "Yes"})
        ];

        const quiz = new QuizQuestions();
        questions.forEach(question => quiz.addQuestion(question));
        return quiz;
    };

    beforeEach(() => {
        quizQuestions = setupQuizQuestions();
        questionsManager = new QuestionsManager(quizQuestions);
    });

    describe("constructor()", () => {
        it("should initialize successfully", () => {
            expect(questionsManager).toBeDefined();
            expect(questionsManager.getQuestion().text).toBe("Is the sky blue?");
        });

        it("should throw error on invalid constructor arguments", () => {
            const invalidObj = "This is not a QuizQuestions instance";
            expect(() => new QuestionsManager(invalidObj)).toThrow(InvalidQuizQuestionsError);

            const emptyQuiz = new QuizQuestions();
            expect(() => new QuestionsManager(emptyQuiz)).toThrow(EmptyQuestionBankError);
        });
    });

    describe("hasMoreQuestions()", () => {
        it("should determine if more questions are available", () => {
            expect(questionsManager.hasMoreQuestions()).toBe(true);

            for (let i = 0; i < 4; i++) {
                questionsManager.advanceCurrentIndex();
            }

            expect(questionsManager.hasMoreQuestions()).toBe(false);
        });
    });

    describe("getQuestion()", () => {
        it("should retrieve the current question based on index", () => {
            expect(questionsManager.getQuestion().text).toBe("Is the sky blue?");
            questionsManager.advanceCurrentIndex();
            expect(questionsManager.getQuestion().text).toBe("Is there clouds in the sky?");
        });
    });

    describe("reset()", () => {
        it("should reset the question index", () => {
            const initialQuestion = questionsManager.getQuestion();
            questionsManager.advanceCurrentIndex();
            expect(initialQuestion).not.toBe(questionsManager.getQuestion());
            questionsManager.reset();
            expect(initialQuestion).toBe(questionsManager.getQuestion());
        });
    });
});
