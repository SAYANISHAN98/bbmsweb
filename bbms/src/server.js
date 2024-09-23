const http = require('http');
const url = require('url');
const { parse } = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'POST' && parsedUrl.pathname === '/api/chat') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      const { query } = parsedBody;

      // Sample response, adjust logic as needed
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ response: `You asked: ${query}` }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
