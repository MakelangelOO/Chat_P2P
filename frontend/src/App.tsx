import React, { useState, useEffect, useRef } from "react"
import Title from "./components/Title.component"
import ChatBox from "./components/ChatBox.component"
import FormMessage from "./components/FormMessage.component"
import Input from "./components/Input.component"
import { ConversionData, Rates } from "./dtos/conversion.dto"
import conversionService from "./services/conversion.service"
import { io, Socket } from "socket.io-client"
import './styles/styles.css'

// The React.FC interface is used in functional components, this syntax simply says what type of props the functional component accepts.
const App: React.FC = () => {
  const [messages, setMessages] = useState<Array<string>>([])//state to save messages
  const [name, setName] = useState<string>('')//state to save client Name
  const [newMessage, setNewMessage] = useState<string>('')//state to save value and control newMessage input
  const [disabled, setDisabled] = useState<boolean>(true)//state to control that the button and the chat input are not activated in certain cases
  const rates = useRef<Array<string>>([])//reference to be able to get connection with the chat in real time and that its value does not change.
  const socket = useRef<Socket | null>(null)// reference to save the socket that allows the transmission of data in the chat in real time

  //init the state
  useEffect(() => {
    const getRates = async (): Promise<void> => {
      const response: Rates | null = await conversionService.GetConversionRates()
      if (response !== null) rates.current = Object.keys(response.rates)
    }
    getRates()//get Exchange Rates

    socket.current = io(import.meta.env.VITE_CHAT_AND_CONVERTION_API_SERVER)// obtaining a stable connection to the chat
  }, [])
  
  // checking that the new messages received in the chat are added
  useEffect(() => {
    socket.current?.on("chat message", (msg: string) => {// listen chat message room
      setMessages([...messages, msg])// save the new message
    })
  }, [messages])

  // method for handling the event associated with the name input
  const handleNewMessageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewMessage(event.target.value)
  }

  //method for handling the event associated with the chat input
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    if (!value.includes(' ')) setName(event.target.value)//validating that the name does not contain spaces
    if (value.length != 0) {//validating that the name is not blank for the correct functioning of the app.
      setDisabled(false)
    } else {
      setDisabled(true)  
    }
  }
//method for emit new message in the real time chat
  const SendMessage = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    socket.current?.emit("chat message", `${name}: ${newMessage}`)// broadcasting the message together with the author
    let conversionData: ConversionData | null
    if (newMessage.includes('Convertir:')) {//checking if it is necessary to validate the whole message

      setDisabled(true)
      conversionData = conversionService.conversionListener(newMessage, rates.current)//checking message and get the correct data for request

      if (conversionData !== null) {// if the message is a conversion request
        conversionService.ConversionValues(conversionData).then(newMsg => {
          socket.current?.emit('chat message', newMsg)//broadcasting the server's response to all clients
          socket.current?.emit('chat message', `BOT: Tambien puedes convertir a las siguientes monedas!!: ${rates.current.reduce((first: string, second: string) => `${first}, ${second}`)}`)//broadcasting the exchange rates for client knowledge
          setDisabled(false)
        })
      } else {
        socket.current?.emit('chat message', 'InternalError: Lo sentimos! no fue posible realizar la converision')//in error case
        setDisabled(false)
      }
    } else {
      setDisabled(false)
    }
    setNewMessage('')
  }

  return (
    <div className="container">
      <div className="left-Bar">
        <p className="secund_text">Ingresa un Nombre para Comenzar!</p>
        <Input value={name} onChange={handleNameChange} disabled={false} className="imputName" />
      </div>
      <div className="chat">
        <Title text="PEER TO PEER" />
        <br />
        <hr />
        <br />
        <ChatBox texts={messages} name={name}/>
        <br />
        <FormMessage SendMessage={SendMessage} handleNewMessageChange={handleNewMessageChange} newMessage={newMessage} disabled={disabled} />
      </div>
      <div className="rigth-Bar">
        <Title text="Instrucciones" />
        <br />
        <hr />
        <br />
        <p>Bienvenido!! Esto es un chat en tiempo real con una única sala, podrás comunicarte con más personas si les compartes el link de esta página! Durante la conversación es posible realizar conversiones monetarios de una moneda a otra, solo debes utilizar el formato de texto mostrado aquí abajo y enviar el mensaje por el chat, Suerte!</p>
        <br />
        <div className="containerTextExample">
          <h4>Convertir: 'valor' 'moneda de origen' a 'moneda de destino' </h4>
        </div>
        <br />
        <div>
          <ul>
            <li>Valor: (número) valor monetario en la moneda de origen a convertir</li>
            <li>Moneda de Origen: (text) (Ej: USD, cop, Clp) moneda de origen en la que se especifica el valor</li>
            <li>Moneda de Destino: (text) (Ej: USD, cop, Clp) moneda de destino a la que se espera convertir el valor</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
