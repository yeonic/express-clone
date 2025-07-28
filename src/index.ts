import * as http from 'http';

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Welcome to homepage');
  }
});

server.listen(3000, () => {
  console.log('🚀 server running at http://localhost:3000');
});
