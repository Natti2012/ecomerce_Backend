import express from "express"
import handlebars from "express-handlebars";
import { Server } from "socket.io"
import { indexRouter } from "./routes/index.router.js"
import path from "path";
import { __dirname } from "./utils.js";
import { realTimeRouter } from "./routes/realTimeProducts.views.js";
import { homeRouter } from "./routes/home.views.js";
import { ProductManager } from "./controllers/productManager.js";

const productManager = new ProductManager("src/db/products.json")
const app = express()

const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, () => {
    console.log(`📢 Server listening on port: ${PORT}`);
})

const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));


app.use("/api", indexRouter)

app.use('/', homeRouter)
app.use('/realtimeproducts', realTimeRouter)





socketServer.on('connection', async socket => {
    console.log("Nuevo cliente conectado");

    socket.on('addProduct', async (data) => {
        const added = await productManager.addProduct(data)
        socketServer.emit('allProducts', await productManager.getProducts())
    })


})

app.get("*", (req, res) => {
    res.status(404).json({ status: "error", msg: "Path not found" });
});

