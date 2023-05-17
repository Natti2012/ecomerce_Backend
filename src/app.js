import express, { application, json } from "express"
import { indexRouter } from "./routes/index.router.js"
const app = express()
const PORT =process.env.PORT || 8080

app.use(json())
app.use(express.urlencoded({extended:true}))

app.use("/api", indexRouter)


app.get("/", (req, res) =>{
    res.json({ msg:"Welcome"});
});
app.get("*", (req, res) =>{
    res.status(404).json({status: "error", msg:"Path not found"});
});


app.listen(PORT,()=>{
    console.log(`📢 Server listening on port: ${PORT}`);
})