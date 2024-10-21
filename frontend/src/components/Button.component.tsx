import React from "react"
import '../styles/styles.css'

interface buttonProps{ // This interface validates the data received in the props.
    text: string,
    disabled: boolean
}

// The React.FC interface is used in functional components, this syntax simply says what type of props the functional component accepts.
const Button: React.FC<buttonProps> = (props) => {
    return (
        <button type="submit" disabled={props.disabled} className="button">{props.text}</button>
    )
}
export default Button