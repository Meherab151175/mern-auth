import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { authRoute } from './routes/auth.route.js'
import { userRoute } from './routes/user.route.js'

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


app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Something went wrong'

    res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})






