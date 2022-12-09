import markSheet from "../models/markSheet.js";


const addMarks = async (req, res) => {

    try {
      const data = req.body;
 
      let {Name, Subject, Marks } = data;
  
      if (!Name)
        return res.status(400).send({ status: false, message: `Name is Required` });
  
      if (!Subject)
        return res.status(400).send({ status: false, message: `Subject is Required` });
     
        if (!Marks)
        return res.status(400).send({ status: false, message: `Marks is Required` });
        
        let existName = await markSheet.findOne({Name:Name});

        if(existName){

            let Totalmarks = existName.Marks+ req.body.Marks 

            let updatedMarks = {
               
                Subject: req.body.Subject,
                Marks: Totalmarks,    //1
            };

           let responseData = await markSheet.findOneAndUpdate(
                { _id: existName._id },  
                updatedMarks,
                { new: true }
            )

            return res.status(201).send({ status: true, message: `Success`, data: responseData });
        }

        const finaldata = await markSheet.create(data);
  
        res.status(201).json({ status: true, message: "markscard created successfully", data: finaldata,
        

    
    });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };


  const getByFilter = async (req, res) => {
    try {
      const user_id = req.params.userId;
  
      const user = await userModel.findById(user_id);
  
      res.status(200).send({ status: true, message: "User profile details", data: user });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };



  const updateMarks = async (req, res) => {
    try {
      const user_id = req.params.userId;
  
      const user = await userModel.findById(user_id);
  
      res.status(200).send({ status: true, message: "User profile details", data: user });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };



  const deleteMarks = async function (req, res) {
    
    try {
      let id = req.params.Name;
  
    
      let findProduct = await productModel.findOne({ _id: id });
  
      if (!findProduct) {
        return res.status(404).send({ status: false, msg: "No such Product found" });
      }
  
      const alreadyDeleted= await productModel.findOne({_id: id, isDeleted: true})
  
      if(alreadyDeleted) {
        return res.status(404).send({ status: false, msg: `${alreadyDeleted.title} is already been deleted.` })
      }
  
       
      let data = await productModel.findOne({ _id: id });
      if (data.isDeleted == false) {
        let Update = await productModel.findOneAndUpdate(
          { _id: id },
          { isDeleted: true, deletedAt: Date() },
          { new: true }
        );
        return res.status(200).send({status: true,message: "successfully deleted the product",data:Update});
      } 
  
    } catch (err) {
        console.log(err)
      res.status(500).send({ status: false, Error: err.message });
    }
  };






  const viewMarks = async (req, res) => {
    try {
      const user_id = req.params.userId;
  
      const user = await userModel.findById(user_id);
  
      res.status(200).send({ status: true, message: "User profile details", data: user });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };



  export {addMarks,getByFilter,updateMarks,deleteMarks,viewMarks}
  