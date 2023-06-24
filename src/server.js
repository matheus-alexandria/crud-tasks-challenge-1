import { createServer } from 'node:http';
import { Database } from './db/database.js';

const database = new Database();

const server = createServer(async (req, res) => {
  console.log("Online");
});

server.listen(3335);