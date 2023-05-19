import { Router } from 'express'
import { ProductManager } from '../controllers/productManager.js'
const productManager = new ProductManager("src/db/products.json")
export const realTimeRouter = Router()

realTimeRouter.get('/', async (req, res) => {
  try {
     const data = await productManager.getProducts()
   
    res.status(200).render('realTimeProducts', {data ,style: "index.css"})
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: 'Could not get the product list'
    })
  }
})
