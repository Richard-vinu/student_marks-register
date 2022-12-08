
import express from "express";
const route = express.Router()

import {signUp,login} from '../controllers/userController.js'

import {addMarks} from '../controllers/marksController.js';

//! Testing route
route.get('/test-me',(req,res)=>{res.json('APi fired 🎇🎇')})


//!User Apis
route.post('/api/auth/signup',signUp)

route.post('/api/auth/login',login)

route.post('/addMarks',addMarks)



    export default route