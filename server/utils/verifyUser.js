import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js"

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token){
        return errorHandler(401, "User not authenticated")
    }
    
    jwt.verify(token, 'sdefrfr4gv', (err, user)=>{
        if(err) return errorHandler(403, "Token is not valid")
        req.user = user
        next()
    })
}