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
    this.#validateConstructorArguments(chapterNumber, firstPage, lastPage);
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

  #validateConstructorArguments(chapterNumber, firstPage, lastPage) {
    if (typeof chapterNumber !== "number") {
      throw new TypeError("The chapter number of Chapter must be a number");
    }
    if (typeof firstPage !== "number") {
      throw new TypeError("The first page of Chapter must be a number");
    }
    if (typeof lastPage !== "number") {
      throw new TypeError("The last page of Chapter must be a number");
    }
  }
}

export default Chapter;
