function generateMockData() {
  let questions = {
    "questions": []
  }
  for (let i = 0; i < 11; i++) {
    const chapter = "Chapter " + (i + 1);
    for (let y = 0; y < 10; y++) {
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

const allQuestions = generateMockData();
export default allQuestions;