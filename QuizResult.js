class QuizResult {
    #username;
    #score
    #questionResultDetails;

    constructor(username) {
        this.#username = username;
        this.#questionResultDetails = [];
    }

    addQuestionResult(questionText, questionChoices, selectedChoice, wasCorrect, category) {
        this.#questionResultDetails.push({
            "question": questionText,
            "choices": questionChoices,
            "selectedChoice": selectedChoice,
            "correct": wasCorrect,
            "category": category
        })
    }
}