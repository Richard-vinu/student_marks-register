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

  export {addMarks}
  