import { createServer, request } from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((r) => {
    return r.method === method && r.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);
    if (routeParams.groups) {
      req.params = routeParams.groups;
    } else {
      req.params = {}
    }

    try {
      return route.handle(req, res);
    } catch (err) {
      return res.writeHead(400).end(JSON.stringify({
        message: err.message
      }));
    }
  }

  return res.writeHead(404).end();
});

server.listen(3335);
