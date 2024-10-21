import React from 'react'
import '../styles/styles.css'

interface textFieldProps {// This interface validates the data received in the props.
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,//In this case, React's own interfaces are used for the functions that handle events or the state of the html elements.
    disabled: boolean,
    className: string
}
// The React.FC interface is used in functional components, this syntax simply says what type of props the functional component accepts.
const Input: React.FC<textFieldProps> = (props) => {
    return (
        <input type="text" value={props.value} onChange={props.onChange} disabled={props.disabled} className={props.className}/>
    )
}

export default Input