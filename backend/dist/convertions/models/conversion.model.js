"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversionSchema = new mongoose_1.Schema({
    fromCurrency: { type: String, required: true },
    toCurrency: { type: String, required: true },
    originalAmount: { type: Number, required: true },
    finalAmount: { type: Number, required: true },
    success: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});
const conversionModel = (0, mongoose_1.model)('conversion', conversionSchema); //model name in DB
exports.default = conversionModel;
