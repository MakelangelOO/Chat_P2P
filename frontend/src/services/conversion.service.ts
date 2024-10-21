import axios from 'axios'
import { ConversionData, ConvertionResult, Rates } from '../dtos/conversion.dto'
//This function is to validate if within the chat someone requests a conversion.
const conversionListener = ( message: string, PossibleExchanges: Array<string>): ConversionData | null => {
    
    let verificatedData: ConversionData | null = null
    const messageSplit: Array<string> = message.split(' ')// the message is split to validate if it is a conversion request.
    
    if ( messageSplit.length === 5 && //validating the number of words in the message
        messageSplit[0] === "Convertir:" && //validating that the first word is the requirement “ Convert:”
        !isNaN(parseFloat(messageSplit[1])) && //validating that the value comes after the request and that it is a number
        PossibleExchanges.includes(messageSplit[2].toUpperCase()) && // validating that the type of currency is possible
        messageSplit[3] === 'a' &&
        PossibleExchanges.includes(messageSplit[4].toUpperCase())// validating that the type of currency is possible
    ) {
        verificatedData = {//an already valid object is created with the data to make a request
            amount: parseFloat(messageSplit[1]),
            fromCurrency: messageSplit[2],
            toCurrency: messageSplit[4]
        }
    }
    
    return verificatedData
}

//method to call the API and generate the conversion
const ConversionValues = async (data: ConversionData): Promise<string> => {
    try {
        const response:ConvertionResult|string = await axios.post(`/api/conversion`, data).then(response => response.data)// making the request in a promise
        if (typeof response === 'string') return response // checking if the process is unsuccessful on the server
        return `BOT: ${data.amount} ${data.fromCurrency} corresponden a ${response.finalAmount} ${data.toCurrency}`
    } catch (error) {
        throw new Error('error in the call API')   
    }
}
//method to call the API ant get exchange rates
const GetConversionRates = async () : Promise<Rates|null> => {
    try {
        const response: Rates | null =  await axios.get(`/api/rates`).then(response => response.data)// making the request in a promise
        return response
    } catch (error) {
        throw new Error('Error in the call API')
    }
}

export default {
    conversionListener,
    ConversionValues,
    GetConversionRates
}