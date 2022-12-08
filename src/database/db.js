import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
let URI = process.env.URI

let connectDB = async ()=>{
    try{
        mongoose.set('strictQuery', true);
        mongoose.connect(URI)
     
        console.log('Mongobd connected');
    }
    catch(err){
        console.log(err.message);
    }
}
export default connectDB