import {Router} from "express";
import { cartsRouter } from "./cart.routes.js";
import { productRouter } from "./product.routes.js";

export const indexRouter = Router()
 
indexRouter.use("/carts", cartsRouter)
indexRouter.use("/products", productRouter)