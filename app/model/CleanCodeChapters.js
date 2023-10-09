import Chapter from "./Chapter.js";

class CleanCodeChapters {
  #allChapters;
  
  constructor() {
    this.#loadChapters();
  }

  #loadChapters() {
    const allChapters = [
      new Chapter(1, 1, 15),
      new Chapter(2, 17, 30),
      new Chapter(3, 31, 52),
      new Chapter(4, 53, 74),
      new Chapter(5, 75, 90),
      new Chapter(6, 93, 101),
      new Chapter(7, 103, 112),
      new Chapter(8, 113, 120),
      new Chapter(9, 121, 133),
      new Chapter(10, 135, 151),
      new Chapter(11, 153, 169)
    ]
    this.#allChapters = allChapters;
  }

  get allChapters() {
    return this.#allChapters;
  }
}

