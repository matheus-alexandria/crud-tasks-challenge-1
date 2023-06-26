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

  selectById(table, id) {
    const row = this.#database[table].find((row) => row.id === id);
    
    if (!row) {
      throw new Error('There is no row with this id');
    }

    return row;
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

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {id, ...data};
      this.#persist();
    } else {
      throw new Error('There is no row with this id');
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    } else {
      throw new Error('There is no row with this id');
    }
  }
}