const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3333;
const host = process.env.HOST || '0.0.0.0';

io.on('connection', (socket) => {
  console.log(socket.id)
})

server.listen(port, host, () => {
  console.log(`Servidor iniciado em http://${host}:${port}`);
});

module.exports = io;