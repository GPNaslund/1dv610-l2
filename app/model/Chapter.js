/**
 * Represents a Chapter.
 */
class Chapter {
  #chapterNumber;

  #firstPage;

  #lastPage;

  /**
   * Creates a new instance.
   *
   * @param {number} chapterNumber The chapter number.
   * @param {number} firstPage The first page.
   * @param {number} lastPage The last page.
   */
  constructor(chapterNumber, firstPage, lastPage) {
    this.#chapterNumber = chapterNumber;
    this.#firstPage = firstPage;
    this.#lastPage = lastPage;
  }

  get firstPage() {
    return this.#firstPage;
  }

  get lastPage() {
    return this.#lastPage;
  }

  get chapterNumber() {
    return this.#chapterNumber;
  }
}

export default Chapter;
