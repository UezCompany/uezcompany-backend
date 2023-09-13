const io = require('./server');

io.on('connection', (socket) => {
    console.log(socket.id)
})