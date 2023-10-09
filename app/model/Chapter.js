class Chapter {
  #chapterNumber
  #firstPage
  #lastPage

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