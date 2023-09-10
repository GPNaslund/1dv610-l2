const runningInNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
let fs;
let path;
let os;
if (runningInNode) {
  fs = require('fs/promises');
  path = require('path');
  os = require('os');
}



class HighscorePersistence {
  #config

  constructor(config = {}) {
    this.#config = config;
    this.#initLocalStorage();
    this.#initFileSystemStorage();

  }

  saveData(username, points) {
    if (this.#config.localStorage) {
      this.#localStorageSaveData(username, points);
    }
    if (this.#config.fileSystemStorage) {
      this.#fileSystemStorageSaveData(username, points);
    }
  };
  

  getData() {
    if (this.#config.localStorage) {
      return this.#localStorageGetData();
    }
    if (this.#config.fileSystemStorage) {
      return this.#fileSystemStorageGetData();
    }
  }

  #localStorageSaveData(username, points) {
    if (this.#localStorageIsAvailable()) {
      const highScores = this.#localStorageGetData();
      highScores[username] = points;
      const sortedHighscores = this.#sortByPointsDescending(highScores);
      localStorage.setItem(this.#config.localStorage.keyName, JSON.stringify(sortedHighscores));
    } else {
      throw new Error("Local storage is not available for usage");
    }
  }

  #localStorageGetData() {
    if (this.#localStorageIsAvailable()) {
      const exisitingHighscores = localStorage.getItem(this.#config.localStorage.keyName);
      return exisitingHighscores ? JSON.parse(exisitingHighscores) : {};
    } else {
      throw new Error("Local storage is not available for usage");
    }
  }

  
  async #fileSystemStorageSaveData(username, points) {
    try {
      const data = await this.#fileSystemStorageGetData();
      data[username] = points;
      const sortedData = await this.#sortByPointsDescending(data);
      await fs.writeFile(this.#config.fileSystemStorage.path, JSON.stringify(sortedData));
    } catch (e) {
      throw new Error("Could not write to file system!");
    }
  }

  async #fileSystemStorageGetData() {
    try {
      const data = await fs.readFile(this.#config.fileSystemStorage.path, {encoding: "utf-8"});
      return JSON.parse(data);
    } catch (e) {
      if (e.code === "ENOENT") {
        return {};
      }
      throw Error("Could not read from filesystem!");
    }
  }

  #initLocalStorage() {
    if (this.#config.localStorage) {
      this.#config.localStorage.keyName = this.#config.localStorage.keyName || "quizHighscores";
    }
  }

  #initFileSystemStorage() {
    if(this.#config.fileSystemStorage) {
      this.#config.fileSystemStorage.path = this.#config.fileSystemStorage.path || this.#getDefaultFilesystemPath();
    }
  }

  #getDefaultFilesystemPath() {
    const homeDirectory = os.homedir();
    return path.join(homeDirectory, 'QuizHighscores', 'highscores.json');
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

  #sortByPointsDescending(highscoresJSON) {
    const arrayFromJSON = Object.entries(highscoresJSON);
    arrayFromJSON.sort((a, b) => b[1] - a[1]);
    const objectFromArray = Object.fromEntries(arrayFromJSON);
    return objectFromArray;
  }
}