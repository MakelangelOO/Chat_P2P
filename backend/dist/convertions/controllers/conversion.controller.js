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
Object.defineProperty(exports, "__esModule", { value: true });
const conversion_service_1 = require("../services/conversion.service");
const conversionServices = new conversion_service_1.ConversionServices(); // call services methods for Currencies
const convertCurrencies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body; // get data to execute method
        const result = yield conversionServices.convertCurrencies(data); // get conversion
        yield conversionServices.createDBconversion(data, result); //save conversion request in DB
        res.status(200).json({ finalAmount: result }); // send success response
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" }); // send case error
        throw new Error('Error converting currencies');
    }
});
const getRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rates = yield conversionServices.getRates();
        res.status(200).json({ rates });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
        throw new Error('Error traying to get Rates');
    }
});
exports.default = {
    convertCurrencies,
    getRates
};
