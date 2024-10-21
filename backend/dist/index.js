"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // dotenv configuration
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const conversion_route_1 = __importDefault(require("./convertions/routes/conversion.route"));
const mongoDB_1 = require("./config/mongoDB");
const http_1 = __importDefault(require("http"));
const chatSocketIO_1 = require("./config/chatSocketIO");
//initialize Server
const Server = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//middlewares
Server.use(express_1.default.json());
Server.use((0, cors_1.default)());
//setting up frontend service for production
Server.use(express_1.default.static('public'));
//this configuration is for development purposes only and for viewing requests.
morgan_1.default.token('postData', (req, res) => req.method !== 'GET' ? JSON.stringify(req.body) : '');
Server.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms :postData'));
//routes use
Server.use(conversion_route_1.default); //call to conversion routes
//conecting with mongoDB
(0, mongoDB_1.connectDB)();
//establishment of a socketIO server on the same service to create the peer to peer chat
const server = http_1.default.createServer(Server);
const io = (0, chatSocketIO_1.initializeChat)(server); //init chat with socket.io
server.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT} at http://localhost:${PORT}`);
});
