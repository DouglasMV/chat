const socket = io('http://localhost:8000')
const msgContainer = document.getElementById('msg-container')
const roomContainer = document.getElementById('room-container')
const msgForm = document.getElementById('send-container')
const msgInput = document.getElementById('msg-input')

if (msgForm != null) {
  const name = prompt('Digite seu Nome:')
  appendMsg('Você entrou!')
  socket.emit('new-user', roomName, name)

  msgForm.addEventListener('submit', event => {
    event.preventDefault()
    const msg = msgInput.value
    appendMsg(`Você: ${msg}`)
    socket.emit('send-chat-msg', roomName, msg)
    msgInput.value = ''
  })
}

socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'Entrar'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('chat-msg', data => {
  appendMsg(`${data.name}: ${data.msg}`)
})

socket.on('user-connected', name => {
  appendMsg(`${name} entrou!`)
})

socket.on('user-disconnected', name => {
  appendMsg(`${name} saiu!`)
})

function appendMsg (msg) {
  const msgElement = document.createElement('div')
  msgElement.innerText = msg
  msgContainer.append(msgElement)
}
