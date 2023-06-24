import fs from "node:fs/promises";

const databaseUrl = new URL('../../db.json', import.meta.url);

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databaseUrl, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databaseUrl, JSON.stringify(this.#database));
  }
}