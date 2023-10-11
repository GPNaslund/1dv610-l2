/**
 * Utility function for testing purposes, creates mock questions.
 *
 * @param {number} amountOfChapters The amount of chapters to generate.
 * @param {number} amountOfQuestions The amount of questions to generate.
 * @returns
 */
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
