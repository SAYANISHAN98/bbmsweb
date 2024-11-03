const http = require('http');
const { parse } = require('querystring');

// Define the port
const PORT = 5000;

// Create the server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/query') {
    let body = '';

    // Collect the data
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      const queryText = parsedBody.query;

      // Here you can integrate the logic for handling the query
      // For demonstration, we'll just echo back the query
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
