const socket = io.connect('http://localhost:3000')
var form = document.getElementById('form');
var ciclo = document.getElementById('ciclo');
var frequencia = document.getElementById('frequencia');
var tensao = document.getElementById('tensao');

socket.on('connected', () => {
  console.log('Socket Connected')
})

socket.on('disconnect', () => {
  console.log('Socket Disconnected')
})

socket.on('click', () => {
  console.log('server registered click event')
})

socket.on('data', data => {
    tensao.textContent = data
})