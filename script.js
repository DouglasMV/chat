const socket = io('http://localhost:8000')
const msgForm = document.getElementById('send-container')
const msgContainer = document.getElementById('msg-container')
const msgInput = document.getElementById('msg-input')

const name = prompt('Digite seu Nome:')
appendMsg('Você entrou!')
socket.emit('new-user', name)

socket.on('chat-msg', data => {
  appendMsg(`${data.name}: ${data.msg}`)
})

socket.on('user-connected', name => {
  appendMsg(`${name} entrou!`)
})

socket.on('user-disconnected', name => {
  appendMsg(`${name} saiu!`)
})

msgForm.addEventListener('submit', event => {
  event.preventDefault()
  const msg = msgInput.value
  appendMsg(`Você: ${msg}`)
  socket.emit('send-chat-msg', msg)
  msgInput.value = ''
})

function appendMsg (msg) {
  const msgElement = document.createElement('div')
  msgElement.innerText = msg
  msgContainer.append(msgElement)
}
