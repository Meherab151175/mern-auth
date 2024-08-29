import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { UserModel } from './models/userModel.js'

const port = 5000
const app = express()

app.use(cors({
    origin:[ 'http://localhost:3000'],
    credentials: true
}
))
app.use(express.json())
app.use(cookieParser())



mongoose.connect('mongodb://127.0.0.1:27017/jwt-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err))


    app.post('/register', (req, res) => {
        const {username, email, password} = req.body
        const hashPassword = bcrypt.hashSync(password, 10)

        UserModel.create({username, email, password: hashPassword})
            .then(user => res.json(user))
            .catch(err => res.send(err))
    })

    app.post('/login',(req,res)=>{
        const {email, password} = req.body
        UserModel.findOne({email})
        .then(user=>{
            if(password === user.password){
                const accessToken = jwt.sign({email:user.email},"ekj-wef-wer",{expiresIn:"1m"})
                const refreshToken = jwt.sign({email:user.email},"ekj-wef-wer",{expiresIn:"5m"})
                res.cookie("accessToken",accessToken,{maxAge:3000})
                res.cookie("refreshToken",refreshToken,{maxAge:300000,httpOnly:true,sameSite:"strict",secure:true})

                res.json({message:"Login successfully",Login:true})
            }else{
                res.send({message:"Wrong password",Login:false})
            }
            
        })
        .catch(err=>res.json(err))
    })

    const verifyUser = (req,res,next)=>{
        const accessToken = re.cookies.accessToken
        if(!accessToken){
            if(renewToken(req,res)){
                next()
            }
        }else{
            jwt.verify(accessToken,"ekj-wef-wer",(err,decoded)=>{
                if(err){
                    return res.json({valid:false,message:"Invalid token"})
                }else{
                    req.email = decoded.email
                    next()
                }
            })
        }
    };

    const renewToken = (req,res) =>{
        const refreshToken = req.cookies.refreshToken;
        let exists;
        if(!refreshToken){
            return res.json({valid:false,message:"Not cuthenticate!!"})
        }else{
            jwt.verify(refreshToken,"ekj-wef-wer",(err,decoded)=>{
                if(err){
                    return res.json({valid:false,message:"Invalid token"})
                }else{
                    const accessToken = jwt.sign({email:decoded.email},"ekj-wef-wer",{expiresIn:"1m"})
                    res.cookie("accessToken",accessToken,{maxAge:3000})
                    exists
                }
            })
        }
        return exists
    }

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})






