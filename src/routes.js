import { buildRoutePath } from './utils/buildRoutePath.js';
import { Database } from './db/database.js';
import { randomUUID } from 'node:crypto';
import { importCsv } from './utils/loadCsvFile.js';

const database = new Database();

const postTaskHandle = (req, res) => {
  const { title, description } = req.body;
  const now = new Date;

  const task = database.insert('tasks', {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: now,
    updated_at: now,
  });

  return res.end(JSON.stringify(task));
}

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/task'),
    handle: (req, res) => {
      const tasks = database.select('tasks');
      return res.end(JSON.stringify({ tasks: tasks }));
    }
  }, 
  {
    method: 'POST',
    path: buildRoutePath('/task'),
    handle: postTaskHandle
  },
  {
    method: 'PUT',
    path: buildRoutePath('/task/:id'),
    handle: (req, res) => {
      const task = database.selectById('tasks', req.params.id);
      const { title, description } = req.body;
      database.update('tasks', req.params.id, { ...task, title, description, updated_at: new Date });

      return res.writeHead(204).end();
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/task/:id/complete'),
    handle: (req, res) => {
      const task = database.selectById('tasks', req.params.id);
      database.update('tasks', req.params.id, { ...task, completed_at: new Date})

      return res.writeHead(204).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/task/:id'),
    handle: (req, res) => {
      database.delete('tasks', req.params.id);

      return res.writeHead(204).end();
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/import'),
    handle: (req, res) => {
      importCsv(database);

      return res.writeHead(201).end();
    }
  },
]