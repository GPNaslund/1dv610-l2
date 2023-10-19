import InvalidPageOrderError from './errors/InvalidPageOrderError.js';
import InvalidTypeError from './errors/InvalidTypeError.js';

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
    this.#validateNumber('Chapter number', chapterNumber);
    this.#validateNumber('First page', firstPage);
    this.#validateNumber('Last page', lastPage);
    this.#validatePageOrder(firstPage, lastPage);
    
    this.#chapterNumber = chapterNumber;
    this.#firstPage = firstPage;
    this.#lastPage = lastPage;
  }

  // eslint-disable-next-line class-methods-use-this
  #validateNumber(parameter, value) {
    if (typeof value !== 'number') {
      throw new InvalidTypeError(parameter, 'number');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #validatePageOrder(firstPage, lastPage) {
    if (firstPage > lastPage) {
      throw new InvalidPageOrderError();
    }
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
