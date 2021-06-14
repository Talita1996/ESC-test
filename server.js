const http = require('http')
const express = require('express')
const app = express()
const serialport = require('serialport')
const sp_readline = serialport.parsers.Readline

const port = 3000
const Server = http.createServer(app)
const io = require('socket.io')(Server)

app.use(express.static(__dirname + '/public'))

const sPort = new serialport('COM2', {
  // you'll need to check for a your port name first
  baudRate: 9600
})
const parser = new sp_readline()
sPort.pipe(parser);

sPort.on('open', () => {
  console.log('Serial Port Opened')
  let lastValue
  io.on('connection', socket => {
    
    socket.emit('connected')
    let lastValue // we use additional variable to avoid constant sending data to connected socket

    parser.on('data', data => {
      if (lastValue !== data) {
        console.log(data)
        socket.emit('data', data)
      }
      lastValue = data
    })
  })
})

Server.listen(port, () => {
  console.log(`Express server started on ${port}`)
})