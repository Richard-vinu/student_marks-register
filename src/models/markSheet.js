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

    },
    deletedAt: {
        type:Date
    }, 
    isDeleted: {
        type:Boolean, 
        default: false
    }
},{timestamps:true})


export default mongoose.model('MarkSheet',marksSchema)