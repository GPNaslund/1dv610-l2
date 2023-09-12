import fs from 'fs/promises';
import path from 'path';
import os from 'os';


class FilesystemPersistence {
  #path

  constructor(path = undefined) {
    this.#path = path ? path : this.#getDefaultFilesystemPath();
  }

  async saveData(username, points) {
    await this.#fileSystemStorageSaveData(username, points);
  }

  async getData() {
    return await this.#fileSystemStorageGetData();
  }

  async #fileSystemStorageSaveData(username, points) {
    try {
      await this.#directoryExistenceValidation(this.#path);
      await this.#fileExistenceValidation(this.#path);
      const data = await this.#fileSystemStorageGetData();
      if (data[username]) {
        data[username].push(points);
      } else {
        data[username] = [points];
      }
      data[username] = data[username].sort((a, b) => b - a);
      const sortedData = this.#sortByPointsDescending(data);

      await fs.writeFile(this.#path, JSON.stringify(sortedData));
    } catch (e) {
      console.log(e);
      throw new Error("Could not write to file system!");
    }
  }

  async #fileSystemStorageGetData() {
    try {
      await this.#directoryExistenceValidation(this.#path);
      await this.#fileExistenceValidation(this.#path);
      const data = await fs.readFile(this.#path, { encoding: "utf-8" });
      return JSON.parse(data);
    } catch (e) {
      if (e.code === "ENOENT") {
        return {};
      }
      console.log(e);
      throw Error("Could not read from filesystem!");
    }
  }

  async #directoryExistenceValidation(fullPath) {
    const directory = path.dirname(fullPath);
    try {
      await fs.access(directory);
    } catch (e) {
      if (e.code === "ENOENT") {
        await fs.mkdir(directory, { recursive: true })
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

  #sortByPointsDescending(highscoresJSON) {
    const arrayFromJSON = Object.entries(highscoresJSON);
    arrayFromJSON.sort((a, b) => Math.max(...b[1]) - Math.max(...a[1]));
    const objectFromArray = Object.fromEntries(arrayFromJSON);
    return objectFromArray;
  }

}

export default FilesystemPersistence;