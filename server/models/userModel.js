import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    password:String,
    email:String,
    username:String
})

export const UserModel = model('User', userSchema)