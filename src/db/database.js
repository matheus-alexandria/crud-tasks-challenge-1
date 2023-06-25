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

  select(table) {
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  delete(table, id) {
    if (Array.isArray(this.#database[table])) {
      const rows = this.#database[table].filter((row) => row.id !== id);
      this.#database[table] = rows;
    }

    this.#persist();
  }
}