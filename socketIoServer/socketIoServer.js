import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
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

})

httpServer.listen(4000, () => console.log('listning on port 4000'))