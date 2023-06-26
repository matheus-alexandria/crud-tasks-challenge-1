import { parse } from 'csv-parse';
import fs from 'fs';
import { randomUUID } from 'node:crypto';

export async function importCsv(database) {
  const parseFile = parse({
    delimiter: ',',
    from_line: 2,
  });
  fs.createReadStream('src/data/tasks.csv').pipe(parseFile);

  const now = new Date;
  for await (const [title, description] of parseFile) {
    database.insert('tasks', {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: now,
      updated_at: now,
    });
  }

  return;
};