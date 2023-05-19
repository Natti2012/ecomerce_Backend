import { Router } from 'express'
import { ProductManager } from '../controllers/productManager.js'
import { realTimeRouter } from './realTimeProducts.views.js'
import { homeRouter } from './home.views.js'
export const viewRouter = Router()




viewRouter.use('/home', homeRouter)
viewRouter.use('/realtimeproducts', realTimeRouter)

