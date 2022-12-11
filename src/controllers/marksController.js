import markSheet from "../models/markSheet.js";


const addMarks = async (req, res) => {

  try {
    const data = req.body;

    let { Stname, subject, marks } = data;

    if (!Stname)
      return res.status(400).send({ status: false, message: `Name is Required` });

    if (!subject)
      return res.status(400).send({ status: false, message: `Subject is Required` });

    if (!marks)
      return res.status(400).send({ status: false, message: `Marks is Required` });

    let existName = await markSheet.findOne({ Stname: Stname });

    if (existName) {

      let Totalmarks = existName.marks + req.body.marks

      let updatedMarks = {

        Subject: req.body.subject,
        marks: Totalmarks,    //1
      };

      let responseData = await markSheet.findOneAndUpdate(
        { _id: existName._id },
        updatedMarks,
        { new: true }
      )

      return res.status(201).send({ status: true, message: `Success`, data: responseData });
    }

    const finaldata = await markSheet.create(data);

    res.status(201).json({
      status: true, message: "markscard created successfully", data: finaldata,

    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};



//!getByFilter
const getByFilter = async (req, res) => {
  try {
    const user_id = req.params.userId;

    const user = await markSheet.find({markedBy:req.token.userId }).populate('markedBy',{select:{password:0}})
    // const user = await userModel.findById(user_id);

    res.status(200).send({ status: true, message: "User profile details", data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};



//!updateMarks
const updateMarks = async (req, res) => {
  try {
    const user_id = req.params.studentId;
    const markedById = req.params.markedBy;

    if(markedById!=req.token.userId)
    return res.status(403).send({ status: false, message:"Forbidden" });

    let data = req.body.Stname
    let data1 = req.body.subject

    const user = await markSheet.findOneAndUpdate({_id:user_id},{$set:{Stname:data,subject:data1}},{new:true});

    res.status(200).send({ status: true, message: "User profile details", data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};



//!deleteMarks
const deleteMarks = async function (req, res) {

  try {
    let sutName = req.params.studentName;

    console.log(sutName);


    let findStudent = await markSheet.findOne({ Name: sutName });

    if (!findStudent)
      return res.status(404).send({ status: false, msg: "student doest exist" });


    if (findStudent.isDeleted == 'false')
      return res.status(404).send({ status: false, msg: `marks already deleted.` })


    await markSheet.findOneAndUpdate({ _id: findStudent._id },
      {
        isDeleted: true,
        deletedAt: Date()
      },
      { new: true })

    return res.status(200).send({ status: true, message: "successfully deleted the product" });

  }

  catch (err) {
    console.log(err)
    res.status(500).send({ status: false, Error: err.message });
  }
}







const viewMarks = async (req, res) => {
  try {
    const user_id = req.params.userId;

    const user = await userModel.findById(user_id);

    res.status(200).send({ status: true, message: "User profile details", data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};



export { addMarks, getByFilter, updateMarks, deleteMarks, viewMarks }
