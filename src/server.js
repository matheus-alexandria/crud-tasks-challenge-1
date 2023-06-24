import { createServer } from 'node:http';
import { json } from './middlewares/json.js';

const server = createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);
});

server.listen(3335);
