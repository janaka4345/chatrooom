import express from 'express';
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
app.get('/', (req, res) => {
    res.json('Hello world');
});

const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ["http://localhost:3000"]
    }
})

io.on('connection', (socket) => {
    console.log({ user: socket.id });
    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id}-----:-${message}`)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

})

server.listen(4000, () => console.log('listning on port 4000'))