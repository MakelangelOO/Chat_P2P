"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionServices = void 0;
const axios_1 = __importDefault(require("axios"));
const conversion_model_1 = __importDefault(require("../models/conversion.model"));
class ConversionServices {
    convertCurrencies(conversionData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rates = yield this.getRates(); // get rates
                const fromRate = rates[conversionData.fromCurrency.toUpperCase()]; // get initial rate
                const toRate = rates[conversionData.toCurrency.toUpperCase()]; // get final rate
                if (!fromRate || !toRate) { // check rates
                    return `Currency conversion not possible for ${conversionData.fromCurrency} to ${conversionData.toCurrency}.`; // if the rates have not been obtained, send message
                }
                const convertedAmount = (conversionData.amount / fromRate) * toRate; // calculate the conversion
                return parseFloat(convertedAmount.toFixed(2));
            }
            catch (error) {
                console.error(error);
                return 'Error fetching currency conversion rates.'; //in case of error, this message is sent
            }
        });
    }
    createDBconversion(data, result) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let success = true; // created to tell if the operation is correct
                if (typeof result !== 'number') { //checking the typeof the result to manage and save bad conversion
                    result = 0;
                    success = false;
                }
                const newconversion = new conversion_model_1.default({
                    fromCurrency: data.fromCurrency,
                    toCurrency: data.toCurrency,
                    originalAmount: data.amount,
                    success,
                    finalAmount: result
                });
                yield newconversion.save(); // save data in mongoDB
            }
            catch (error) {
                throw new Error('Error creating a DB register');
            }
        });
    }
    getRates() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rates = yield axios_1.default.get(`${process.env.OPEN_EXCHANGE_URL}/latest.json`, {
                    params: {
                        app_id: process.env.OPEN_EXCHANGE_API_KEY, // Api key of Open Exchange Rates
                    },
                }).then(response => response.data.rates); // send a get request to Open Exchange to obtain the json of the exchange rates
                return rates;
            }
            catch (error) {
                throw new Error('error to call exchange rates API');
            }
        });
    }
}
exports.ConversionServices = ConversionServices;
