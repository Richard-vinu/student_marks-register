
import express from "express";
const route = express.Router()

import {signUp,login} from '../controllers/userController.js'

import {addMarks,getByFilter,updateMarks,deleteMarks,viewMarks} from '../controllers/marksController.js';

//! Testing route
route.get('/test-me',(req,res)=>{res.json('APi fired 🎇🎇')})


//!User Apis
route.post('/signup',signUp)

route.post('/login',login)

route.post('/addStudentMarks',addMarks)

route.get('/filterData',getByFilter)

route.put('/updateStudentMarks',updateMarks)

route.delete('/deleteStudentMarks/:studentName',deleteMarks)


// route.get('/student/:name/marks',viewMarks)


export default route