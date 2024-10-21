export interface ConversionData {//Data Transfer Object to perform the API request and convert the values
    amount: number,
    fromCurrency: string,
    toCurrency: string
}

export interface ConvertionResult {//Data Transfer Object to receive the transformed values from the API
    finalAmount: number
}

export interface Rates {//Data Transfer Object to receive exchange rates
    [key: string]: number
}