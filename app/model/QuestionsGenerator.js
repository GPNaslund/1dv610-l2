function generateChapterQuestions(amountOfChapters, amountOfQuestions) {
  const questions = {
    questions: [],
  };
  for (let i = 0; i < amountOfChapters; i += 1) {
    const chapter = `Chapter ${i + 1}`;
    for (let y = 0; y < amountOfQuestions; y += 1) {
      questions.questions.push(
        {
          text: `Question #${y + 1}`,
          choices: ['Yes', 'No'],
          correctChoice: 'Yes',
          category: chapter,
        },
      );
    }
  }
  return questions;
}

export default generateChapterQuestions;
