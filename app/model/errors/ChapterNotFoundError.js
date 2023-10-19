export default class ChapterNotFoundError extends Error {
  constructor(chapterNum) {
    super(`Chapter with number ${chapterNum} was not found`);
    this.name = 'ChapterNotFoundError';
  }
}
