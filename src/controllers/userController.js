import User from '../models/User.js'
import jwt from "jsonwebtoken";
import bcrypt from  'bcrypt'

import{isValidEmail,isValidPwd} from '../utils/validation.js'

const signUp = async (req, res) => {

    try {
      const data = req.body;
 
      let {userName, email, password } = data;
  
      if (!userName)
        return res.status(400).send({ status: false, message: `Username is Required` });
  
      if (!email)
        return res.status(400).send({ status: false, message: `E-mail is Required` });
  
 
      let uniqueEmail = await User.findOne({ email: email });
  
      if (!isValidEmail(email))
        return res.status(400).send({ status: false, message: `This E-mail is Invalid` });
  
      if (uniqueEmail)
        return res.status(400).send({ status: false, message: `This E-mail has alredy registered Pls Sign In`,
        });

  
      if (!isValidPwd(password))
        return res.status(400).send({status: false,message: "Password should be 8-15 characters long and must contain one of 0-9,A-Z,a-z and special characters",
        });
  
      const hashedPassword = await bcrypt.hash(password, 10);

       data.password = hashedPassword
     
      const finaldata = await User.create(data);
  
      res.status(201).json({ status: true, message: "User created successfully", data: finaldata,
      
    });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };
  
//POST /login
const login = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
     

      if (!email)
        return res.status(400).send({ status: false, message: "User email-id is required" });
  
      if (!password)
        return res .status(400) .send({ status: false, message: "User password is required" });
  
      const user = await User.findOne({ email });

      if (!user)
        return res.status(404).send({status: false,message: "This User does not exist Please SignUp",});
  
      let comparedPswd = await bcrypt.compare(password, user.password);
  
      if (!comparedPswd)
        return res .status(401) .send({ status: false, message: "Incorrect Password" });
  
      let payload = { userId: user._id };
      let token = jwt.sign(payload, "secret-key");
  
      res.status(200).send({ status: true,message: "User login successfully",data: { userId: user._id, token: token },});
    } 
    catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };

  export {signUp,login}