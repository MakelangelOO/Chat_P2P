import { Schema, model, Document } from "mongoose";

export interface conversionInterface extends Document { //create an interface for the control of this shema
    fromCurrency: string,
    toCurrency: string,
    originalAmount: number,
    finalAmount: number,
    success: boolean,
    createdAt: Date
}

const conversionSchema = new Schema<conversionInterface>({//create the schema and define the mongo types
    fromCurrency: {type: String, required: true},
    toCurrency: {type: String, required: true},
    originalAmount: {type: Number, required: true},
    finalAmount: {type: Number, required: true},
    success: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now}
})

const conversionModel = model('conversion', conversionSchema)//model name in DB

export default conversionModel


