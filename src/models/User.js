import mongoose from "mongoose";


let userSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true

    }
},{timestamps:true})


export default mongoose.model('User',userSchema)