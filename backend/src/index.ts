require('dotenv').config() // dotenv configuration
import express, { Express, Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"
import conversionRouter from "./convertions/routes/conversion.route"
import { connectDB } from "./config/mongoDB"
import { Server as Engine } from "socket.io"
import http from "http"
import { initializeChat } from "./config/chatSocketIO"

//initialize Server
const Server: Express = express()
const PORT = process.env.PORT || 3000 

//middlewares
Server.use(express.json())
Server.use(cors())

//setting up frontend service for production
Server.use(express.static('public'))

//this configuration is for development purposes only and for viewing requests.
morgan.token('postData', (req: Request, res: Response): string => req.method !== 'GET' ? JSON.stringify(req.body) : '')
Server.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

//routes use
Server.use(conversionRouter)//call to conversion routes

//conecting with mongoDB
connectDB()

//establishment of a socketIO server on the same service to create the peer to peer chat
const server: http.Server = http.createServer(Server)

const io: Engine = initializeChat(server)//init chat with socket.io

server.listen(PORT, () => { 
    console.log(`Server is running in port: ${PORT} at http://localhost:${PORT}`)
})

