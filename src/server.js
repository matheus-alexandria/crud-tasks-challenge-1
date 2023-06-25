import { createServer } from 'node:http';
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

    return route.handle(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3335);
