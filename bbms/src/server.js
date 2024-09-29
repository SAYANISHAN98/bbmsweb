const http = require('http');
const { parse } = require('querystring');

const PORT = 5000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/query') {
    let body = '';

       req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      const queryText = parsedBody.query;

     
      const response = `You asked: ${queryText}`;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ response }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
