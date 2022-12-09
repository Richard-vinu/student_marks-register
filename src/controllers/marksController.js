import markSheet from "../models/markSheet.js";


const addMarks = async (req, res) => {

  try {
    const data = req.body;

    let { Name, Subject, Marks } = data;

    if (!Name)
      return res.status(400).send({ status: false, message: `Name is Required` });

    if (!Subject)
      return res.status(400).send({ status: false, message: `Subject is Required` });

    if (!Marks)
      return res.status(400).send({ status: false, message: `Marks is Required` });

    let existName = await markSheet.findOne({ Name: Name });

    if (existName) {

      let Totalmarks = existName.Marks + req.body.Marks

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

    const user = await userModel.findById(user_id);

    res.status(200).send({ status: true, message: "User profile details", data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};



//!updateMarks
const updateMarks = async (req, res) => {
  try {
    const user_id = req.params.userId;

    const user = await userModel.findById(user_id);

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
