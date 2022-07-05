import express from "express";
import cors from "cors"
import joi from "joi";
import dotenv from "dotenv"
import { db } from "./mongo.js"

const app = express()

dotenv.config()
app.use(express.json)
app.use(cors)


app.post("/cadastrarUser" , async (req, res)=>{
    const user = req.body
    console.log("Oi")

    const userSchema = joi.object({
        email: joi.string().required(),
        senha: joi.string().required()
    })
    const { error } = userSchema.validate({user})
    if(error){
        return res.status(400).send("formato incorreto")
    }
    return res.status(200).send("OK")
})

app.get("/oi" , (req , res)=>{
    res.send("oi")
})
const PORT = 3560
app.listen(PORT, ()=>{
    console.log(`entrei ${PORT}`)
})