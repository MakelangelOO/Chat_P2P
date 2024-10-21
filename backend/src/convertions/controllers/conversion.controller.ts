import { Request, Response } from "express"
import { ConversionServices } from "../services/conversion.service"
import { conversionRequestDTO } from "../dtos/conversion.dto"
import { Rates } from "../dtos/rates.dto"

const conversionServices: ConversionServices = new ConversionServices() // call services methods for Currencies

const convertCurrencies = async (req: Request, res: Response): Promise<void> => { // method for control the petition of the endpoint
    try {
        const data: conversionRequestDTO = req.body // get data to execute method
        const result = await conversionServices.convertCurrencies(data) // get conversion
        await conversionServices.createDBconversion(data, result) //save conversion request in DB
        
        res.status(200).json({finalAmount: result}) // send success response
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"}) // send case error
        throw new Error('Error converting currencies')
    }
}

const getRates = async (req: Request, res: Response): Promise<void> => {
    try {
        const rates: Rates|null = await conversionServices.getRates()
        res.status(200).json({rates})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error"})
        throw new Error('Error traying to get Rates')
    }
}

export default {
    convertCurrencies,
    getRates
}