import { createServer } from 'node:http';

const server = createServer(async (req, res) => {
  console.log("Online");
});

server.listen(3335);