const app = require('./app');
const http = require('http');

const server = http.createServer(app);

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
