import { Router } from "express"
import conversionController from "../controllers/conversion.controller"

const conversionRouter: Router = Router()

conversionRouter.post('/api/conversion', conversionController.convertCurrencies) // define route to make a conversion
conversionRouter.get('/api/rates', conversionController.getRates) // define route to get rates

export default conversionRouter