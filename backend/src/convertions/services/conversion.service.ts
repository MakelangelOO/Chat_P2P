import axios from "axios"
import { conversionRequestDTO } from "../dtos/conversion.dto";
import { Rates } from "../dtos/rates.dto";
import conversionModel from "../models/conversion.model";


export class ConversionServices {
  async convertCurrencies (conversionData: conversionRequestDTO): Promise<string|number> { //Function to convert currencies using the Open Exchange Rates API
    try {
      const rates: Rates = await this.getRates()// get rates
      const fromRate: number = rates[conversionData.fromCurrency.toUpperCase()]; // get initial rate
      const toRate:number = rates[conversionData.toCurrency.toUpperCase()]; // get final rate
      

      if (!fromRate || !toRate) { // check rates
        return `Currency conversion not possible for ${conversionData.fromCurrency} to ${conversionData.toCurrency}.`; // if the rates have not been obtained, send message
      }

      const convertedAmount = (conversionData.amount / fromRate) * toRate; // calculate the conversion
      
      return parseFloat(convertedAmount.toFixed(2))
    } catch (error) {
      console.error(error);
      return 'Error fetching currency conversion rates.'; //in case of error, this message is sent
    }
  }

  async createDBconversion (data: conversionRequestDTO, result: number|string): Promise<void> {// Function to store data in MongoDB
    try {
      let success = true // created to tell if the operation is correct
      
      if (typeof result !== 'number') { //checking the typeof the result to manage and save bad conversion
        result = 0
        success = false
      }
      const newconversion = new conversionModel({ //create the conversion model with the data
        fromCurrency: data.fromCurrency,
        toCurrency: data.toCurrency,
        originalAmount: data.amount,
        success,
        finalAmount: result
      })
      await newconversion.save() // save data in mongoDB
    } catch (error) {
      throw new Error('Error creating a DB register')
    }
  }

  async getRates (): Promise<Rates> {
    try {
      const rates: Rates = await axios.get(`${process.env.OPEN_EXCHANGE_URL}/latest.json`, {
        params: {
          app_id: process.env.OPEN_EXCHANGE_API_KEY, // Api key of Open Exchange Rates
        },
      }).then(response => response.data.rates);// send a get request to Open Exchange to obtain the json of the exchange rates
      return rates
    } catch (error) {
      throw new Error('error to call exchange rates API')
    }
  }
}
