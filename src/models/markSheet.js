import mongoose from "mongoose";


let marksSchema = new mongoose.Schema({

 Name:{
        type:String,
        required:true,
        trim:true
    },

    Subject :{
        type:String,
        required:true,
        trim:true
    },
    Marks:{
        type:Number,
        required:true,
        trim:true

    }
},{timestamps:true})


export default mongoose.model('MarkSheet',marksSchema)