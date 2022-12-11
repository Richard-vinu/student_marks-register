import mongoose from "mongoose";
let ObjectId = mongoose.Schema.ObjectId

let marksSchema = new mongoose.Schema({

 Stname:{
        type:String,
        required:true,
        trim:true
    },

subject :{
        type:String,
        required:true,
        trim:true
    },
marks:{
        type:Number,
        required:true,
        trim:true

    },

markedBy:{
        type:ObjectId,
        ref:'User',
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