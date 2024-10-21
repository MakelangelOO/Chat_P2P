"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeChat = void 0;
const socket_io_1 = require("socket.io");
const initializeChat = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        }
    }); //start the socketIO communication with the already created http service
    io.on('connect', (socket) => {
        console.log('socketIO connected:', socket.id);
        socket.on('chat message', (message) => {
            io.emit('chat message', message); // send message to clients
        });
    });
    return io;
};
exports.initializeChat = initializeChat;
