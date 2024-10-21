"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversion_controller_1 = __importDefault(require("../controllers/conversion.controller"));
const conversionRouter = (0, express_1.Router)();
conversionRouter.post('/api/conversion', conversion_controller_1.default.convertCurrencies); // define route to make a conversion
conversionRouter.get('/api/rates', conversion_controller_1.default.getRates); // define route to get rates
exports.default = conversionRouter;
