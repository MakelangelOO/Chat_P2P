import React from "react"
import Message from "./Message.component"
import '../styles/styles.css'

interface ChatBoxProps { // This interface validates the data received in the props.
    texts: Array<string>
    name: string
}
// The React.FC interface is used in functional components, this syntax simply says what type of props the functional component accepts.
const ChatBox: React.FC<ChatBoxProps> = ( props ) => {
    return (
        <div className="chatMessagesContainer"> {/**Add style at div element */}
            {props.texts.map( (messageText, index) => <Message key={index} text={ messageText } name={props.name} />)}{/**Iterating incoming messages to display them */}
        </div>
    )
}

export default ChatBox