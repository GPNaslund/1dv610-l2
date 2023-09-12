class LocalStoragePersistence {
  #keyName

  constructor(keyName = 'quizHighscores') {
    this.#keyName = keyName;
  }

  saveData(username, points) {
    this.#localStorageSaveData(username, points);
  }

  getData() {
    return this.#localStorageGetData();
  }

  #localStorageSaveData(username, points) {
    if (this.#localStorageIsAvailable()) {
      const highScores = this.#localStorageGetData();
      highScores[username] = points;
      const sortedHighscores = this.#sortByPointsDescending(highScores);
      localStorage.setItem(this.#keyName, JSON.stringify(sortedHighscores));
    } else {
      throw new Error("Local storage is not available for usage");
    }
  }

  #localStorageGetData() {
    if (this.#localStorageIsAvailable()) {
      const exisitingHighscores = localStorage.getItem(this.#keyName);
      return exisitingHighscores ? JSON.parse(exisitingHighscores) : {};
    } else {
      throw new Error("Local storage is not available for usage");
    }
  }

  #sortByPointsDescending(highscoresJSON) {
    const arrayFromJSON = Object.entries(highscoresJSON);
    arrayFromJSON.sort((a, b) => Math.max(...b[1]) - Math.max(...a[1]));
    const objectFromArray = Object.fromEntries(arrayFromJSON);
    return objectFromArray;
  }

  #localStorageIsAvailable() {
    if (typeof window === "undefined") {
      return false;
    }
    try {
      window.localStorage.setItem("test", "test");
      window.localStorage.removeItem("test", "test");
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default LocalStoragePersistence;