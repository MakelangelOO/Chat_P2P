import React from "react"
import '../styles/styles.css'

interface MessageProps {// This interface validates the data received in the props.
    text: string,
    name: string
}
// The React.FC interface is used in functional components, this syntax simply says what type of props the functional component accepts.
const Message: React.FC<MessageProps> = (props) => {
    let name: string = props.text.slice(0, props.text.indexOf(' '))//only the name of the sender of the message is extracted
    name = name.replace(':', '')
    let msg: string = props.text.replace(`${name}: `, '').trim() // the message is extracted without the sender
    
    if(name != props.name) { //checks if the message is from our client to control the interface
        return (
            <div className="containerMessage">
                <p className="pName">{name}</p>
                <div className="message">
                    <p className="messageText">{msg}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="myContainerMessage">
                <p className="pName">{name}</p>
                <div className="message-own">
                    <p className="messageText-own">{msg}</p>
                </div>
            </div>
        )
    }
}

export default Message