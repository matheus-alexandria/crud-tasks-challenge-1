import { createServer } from 'node:http';
import { Database } from './db/database.js';
import { json } from './middlewares/json.js';

const database = new Database();

const server = createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);
});

server.listen(3335);