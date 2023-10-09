class QuestionsGenerator {
  
  generateChapterQuestions(amountOfChapters, amountOfQuestions) {
    let questions = {
      "questions": []
    }
    for (let i = 0; i < amountOfChapters; i++) {
      const chapter = "Chapter " + (i + 1);
      for (let y = 0; y < amountOfQuestions; y++) {
        questions.questions.push(
          {
            "text": "Question #" + (y + 1),
            "choices": ["Yes", "No"],
            "correctChoice": "Yes",
            "category": chapter
          }
        )
      }
    }
    return questions;
  }
}

export default QuestionsGenerator;