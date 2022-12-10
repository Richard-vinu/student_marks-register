import mongoose from "mongoose";


let marksSchema = new mongoose.Schema({

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

teacher:{
    type:String,
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