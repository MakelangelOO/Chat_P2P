import React from "react"
import '../styles/styles.css'

interface TitleProps {// This interface validates the data received in the props.
    text: string
}
// The React.FC interface is used in functional components, this syntax simply says what type of props the functional component accepts.
const Title: React.FC<TitleProps> =  ( props ) => {
    return (
        <h3 className="textTitle">{ props.text }</h3>
    )
}

export default Title