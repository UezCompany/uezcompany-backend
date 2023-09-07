const app = require('./app');
const http = require('http');

const server = http.createServer(app);

const port = process.env.PORT || 3333;
const host = process.env.HOST || '0.0.0.0';

server.listen(port, host, () => {
  console.log(`Servidor iniciado em http://${host}:${port}`);
});
