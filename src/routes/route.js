
import express from "express";
const route = express.Router()

import {signUp,login} from '../controllers/userController.js'

import {Authn,Authz} from '../utils/auth.js'


import {addMarks,getByFilter,updateMarks,deleteMarks,viewMarks} from '../controllers/marksController.js';

//! Testing route
route.get('/test-me',(req,res)=>{res.json('APi fired 🎇🎇')})


//!User Apis
route.post('/signup',signUp)

route.post('/login',login)

route.post('/addStudentMarks',Authn,addMarks)

route.get('/studentList',Authn,getByFilter)

route.put('/updateStudentMarks/:studentId/:markedBy',Authn,updateMarks)

route.delete('/deleteStudentMarks/:studentName',deleteMarks)




export default route