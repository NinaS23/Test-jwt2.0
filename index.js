import express , { json } from "express";
import cors from "cors"
import joi from "joi";
import dotenv from "dotenv"
import { db } from "./mongo.js"
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken"

const app = express()

dotenv.config()
app.use(json())
app.use(cors())

console.log("oi")
app.post("/cadastrarUser" , async (req, res)=>{
    const  { email , senha } = req.body
    console.log("Oi")
try{
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
    const emailExistente = await db.collection("users_jwt").findOne({email})
    if(emailExistente){
        return res.send("email existente")
    }

    await db.collection("users_jwt").insertOne({email , senha })
    return res.status(200).send("OK")
}catch(e){console.log(e)}
   
})

app.post("/logar",async (req, res) => {
    const { email, senha } = req.body
    try{
        const userSchema = joi.object({
            email: joi.string().email().required(),
            senha: joi.string().required()
        })
       
        console.log(email, senha)
        const validar = userSchema.validate({ email, senha })
        if(validar.error){
            return res.status(400).send("formato incorreto")
        }
        const usuarioExistente = await db.collection("users_jwt").findOne({email})
        const dados = {email:email};
        const key = "secret" // aqui é pra ser uma variável de hambiente , por segurança e não ficar aqui no code 
      //  const configuracoes = { expiresIn: 60*60*24*30 } // 30 dias em segundos para expirar
        if(!usuarioExistente){
            return res.send("email ou senha incorretos")
        }
        const token = jwt.sign(dados, key);//aqui dentro , coloca-se o configuraçoes 
        return res.send({token})
    }catch(e){console.log(e)}
   
   
})
const PORT = 3580
app.listen(PORT, () => {
    console.log(`entrei ${PORT}`)
})