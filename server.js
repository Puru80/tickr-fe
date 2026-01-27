const http = require('http');

const user = {
  id: '1',
  name: 'Arjun Sharma',
  email: 'arjun@tickr.io',
  avatar: undefined,
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/api/user' && req.method === 'GET') {
    res.end(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
