import React, { ChangeEventHandler, FormEventHandler } from "react"
import Button from "./Button.component"
import Input from "./Input.component"
import '../styles/styles.css'

interface formMessageProps {// This interface validates the data received in the props.
    SendMessage: FormEventHandler<HTMLFormElement>, //In this case, React's own interfaces are used for the functions that handle events or the state of the html elements.
    newMessage: string,
    handleNewMessageChange: ChangeEventHandler<HTMLInputElement>,
    disabled: boolean
}
// The React.FC interface is used in functional components, this syntax simply says what type of props the functional component accepts.
const FormMessage: React.FC<formMessageProps> = (props) => {
    return (
        <form onSubmit={props.SendMessage} className="form">
                <Input value={props.newMessage} onChange={props.handleNewMessageChange} disabled={props.disabled} className="inputMessage"/>
                <Button text="Enviar" disabled={props.disabled}/>
        </form>
    )
}

export default FormMessage