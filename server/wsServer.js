const ws = require('ws')
const server = new ws.Server({ port: '4000' })

server.on('connection', (socket) => {
    socket.on('message', (message) => {
        console.log(message);
        socket.send(`${message}`)
    })
},)