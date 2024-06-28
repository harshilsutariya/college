import uuid4 from 'uuid4';
import studentDetailModel from '../../../model/student/studentRegistration.js';
import collegeDetailModel from '../../../model/collegeDetail/collegeDetail.js';
import studentFavouriteCollegeModel from '../../../model/student/studentFavouriteCollege.js';

const studentFavouriteCollegeCreateMethod = async (req, res) => {
    try {
        const collegeId = req.body.collegeId;
        const studentId = req.body.studentId;
        

        if (collegeId == null || studentId == null ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const college = await collegeDetailModel.findOne({ collegeId, isDeleted: { $ne: true } });
        if (!college) {
            return res.status(404).send({ error: "College is not available. Enter correct collegeId." });
        }

        const student = await studentDetailModel.findOne({ studentId, isDeleted: { $ne: true } });
        if (!student) {
            return res.status(404).send({ error: "student is not available. Enter correct studentId." });
        }

        const studentFavouriteCollege = await studentFavouriteCollegeModel.find({ studentId,collegeId });
        if (studentFavouriteCollege.length>0) {
            return res.status(404).send({ error: "studentFavouriteCollege is already exist" });
        }

            const studentFavouriteCollegeId = uuid4();
            const newstudentFavouriteCollege = new studentFavouriteCollegeModel({
                studentId,studentFavouriteCollegeId,collegeId
            });

            if (!newstudentFavouriteCollege) {
                return res.status(400).json({
                    error: 'something went wrong'
                });
            }

            const studentFavouriteCollegeData = await newstudentFavouriteCollege.save();

            res.status(201).json({
                message: "student Detail Add Successfully",
                studentFavouriteCollegeData
            });
    }
    catch (error) {
        res.status(500).json({ message: "error", error });
        console.log(error);
    }
}

export default studentFavouriteCollegeCreateMethod;