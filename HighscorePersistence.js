const runningInNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
let fs;
let path;
let os;
if (runningInNode) {
  import('fs/promises').then(module => {
    fs = module;
  })
  import('path').then(module => {
    path = module;
  })
  import('os').then(module => {
    os = module;
  })
}

class HighscorePersistence {
  #config
  #fs;
  #path;
  #os;

  constructor(config = {}) {
    this.#config = config;
    this.#initLocalStorage();
    this.#initFileSystemStorage();
  }
  

  async saveData(username, points) {
    if (this.#config.localStorage) {
      this.#localStorageSaveData(username, points);
    }
    if (this.#config.fileSystemStorage) {
      await this.#fileSystemStorageSaveData(username, points);
    }
  };
  

  async getData() {
    if (this.#config.localStorage) {
      return this.#localStorageGetData();
    }
    if (this.#config.fileSystemStorage) {
      return await this.#fileSystemStorageGetData();
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
      const path = this.#config.fileSystemStorage.path;
      await this.#directoryExistenceValidation(path);
      await this.#fileExistenceValidation(path);
      const data = await this.#fileSystemStorageGetData();
      if (data[username]) {
        data[username].push(points);
      } else {
        data[username] = [points];
      }
      data[username] = data[username].sort((a, b) => b - a);
      const sortedData = this.#sortByPointsDescending(data);

      await fs.writeFile(path, JSON.stringify(sortedData));
    } catch (e) {
      console.log(e);
      throw new Error("Could not write to file system!");
    }
  }

  async #fileSystemStorageGetData() {
    try {
      const path = this.#config.fileSystemStorage.path;
      await this.#directoryExistenceValidation(path);
      await this.#fileExistenceValidation(path);
      const data = await fs.readFile(path, {encoding: "utf-8"});
      return JSON.parse(data);
    } catch (e) {
      if (e.code === "ENOENT") {
        return {};
      }
      console.log(e);
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

  async #directoryExistenceValidation(fullPath) {
    const directory = path.dirname(fullPath);
    try {
      await fs.access(directory);
    } catch (e) {
      if (e.code === "ENOENT") {
        await fs.mkdir(directory, {recursive: true})
      }
    }
  }

  async #fileExistenceValidation(fullPath) {
    try {
      await fs.access(fullPath);
    } catch (e) {
      if (e.code === "ENOENT") {
        await fs.writeFile(fullPath, JSON.stringify({}));
      }
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
    arrayFromJSON.sort((a, b) => Math.max(...b[1]) - Math.max(...a[1]));
    const objectFromArray = Object.fromEntries(arrayFromJSON);
    return objectFromArray;
  }
}

export default HighscorePersistence;