import { buildRoutePath } from '../utils/buildRoutePath.js';
import { Database } from './db/database.js';
import { randomUUID } from 'node:crypto';

const database = new Database();

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
    handle: (req, res) => {
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
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/task/:id'),
    handle: (req, res) => {
      database.delete('tasks', req.params.id);

      return res.writeHead(204).end();
    }
  }
]