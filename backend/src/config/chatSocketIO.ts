import { Server as Engine } from "socket.io"
import http from 'http'

export const initializeChat = (server: http.Server): Engine => {

    const io = new Engine(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        }
    }) //start the socketIO communication with the already created http service

    io.on('connect', (socket: any) => { // .on allow to add a listener for the events in this case a connection. In this connection we can receive and send all messages from client to client.
        console.log('socketIO connected:', socket.id)
        socket.on('chat message', (message: string) => {//listen message by socket
            io.emit('chat message', message)// send message to clients
        })
    })

    return io

}