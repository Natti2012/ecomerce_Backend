import { Router } from 'express'
import { ProductManager } from '../controllers/productManager.js'
 const productManager = new ProductManager("src/db/products.json")
export const homeRouter = Router()

homeRouter.get('/', async (req, res)=>{
 
 const data =  await productManager.getProducts()
  res.render("home",{ data, style: "index.css"})
})

