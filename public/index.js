const socket = io.connect('http://localhost:3000')
var form = document.getElementById('form');
var input = document.getElementById('input');

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
    console.log(data)
  /*document.body.setAttribute('style', `background-color: hsl(${Math.round(data/3)}, 100%, 50%)`)*/
})

form.addEventListener('submit', function(e) {
  console.log(input.value);
  e.preventDefault();
  if (input.value) {
    socket.emit('ciclo de trabalho', { value: input.value } );
    input.value = '';
  }
});