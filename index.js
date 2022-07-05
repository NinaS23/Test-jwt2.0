import express , { json } from "express";
import cors from "cors"
import joi from "joi";
import dotenv from "dotenv"
import { db } from "./mongo.js"

const app = express()

dotenv.config()
app.use(json())
app.use(cors())

console.log("oi")
app.post("/cadastrarUser" , async (req, res)=>{
    const  { email , senha } = req.body
    console.log("Oi")

    const userSchema = joi.object({
        email: joi.string().email().required(),
        senha: joi.string().required()
    })
    console.log(email , senha)
    const validar = userSchema.validate({email, senha})
    console.log(validar)
    if(validar.error){
        return res.status(400).send("formato incorreto")
    }
    await db.collection("users_jwt").insertOne({email , senha})
    return res.status(200).send("OK")
})

app.get("/oi" , (req , res)=>{
    res.send("oi")
})
const PORT = 3580
app.listen(PORT, ()=>{
    console.log(`entrei ${PORT}`)
})