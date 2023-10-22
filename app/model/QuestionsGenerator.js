/**
 * Represents a questions generator, built for development and testing purposes.
 */
class QuestionsGenerator {
  /**
 * Utility function that creates mock questions.
 *
 * @param {number} amountOfChapters The amount of chapters to generate.
 * @param {number} amountOfQuestions The amount of questions to generate.
 * @returns An array of question data objects.
 */
  generateChapterQuestions(amountOfChapters, amountOfQuestions) {
    this.#validateGenerateChapterQuestionsArguments(amountOfChapters, amountOfQuestions);
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

  #validateGenerateChapterQuestionsArguments(amountOfChapters, amountOfQuestions) {
    if (typeof amountOfChapters !== 'number' || amountOfChapters <= 0 || !Number.isInteger(amountOfChapters)) {
      throw new TypeError('amountOfChapters must be a positive integer');
    }

    if (typeof amountOfQuestions !== 'number' || amountOfQuestions <= 0 || !Number.isInteger(amountOfQuestions)) {
      throw new TypeError('amountOfQuestions must be a positive integer');
    }
  }

}