const io = require('socket.io')(8000)

io.on('conection', socket => {
  socket.emit('chat-msg', 'Hello World')
})