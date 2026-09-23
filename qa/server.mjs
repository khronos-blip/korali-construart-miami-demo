import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../public/', import.meta.url));
const prefix = '/demos/construart-miami';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };

export function createServer(port = 4173) {
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);
      if (!(url.pathname === prefix || url.pathname.startsWith(`${prefix}/`))) {
        response.writeHead(404).end('Not found'); return;
      }
      let relative = url.pathname.slice(prefix.length) || '/index.html';
      if (relative === '/') relative = '/index.html';
      const safe = normalize(relative).replace(/^(\.\.[/\\])+/, '').replace(/^[/\\]+/, '');
      const path = join(root, safe);
      const info = await stat(path);
      if (!info.isFile() || !path.startsWith(root)) throw new Error('Invalid path');
      const body = await readFile(path);
      response.writeHead(200, { 'content-type': mime[extname(path)] || 'application/octet-stream', 'cache-control': 'no-store' });
      response.end(body);
    } catch {
      response.writeHead(404).end('Not found');
    }
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = await createServer(Number(process.env.PORT || 4173));
  console.log(`Local demo: http://127.0.0.1:${server.address().port}${prefix}/`);
}
