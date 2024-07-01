import uuid4 from 'uuid4';
import StudentCollegeApplication from "../../../model/student/studentCollegeApplication.js";
import collegeDetailModel from '../../../model/collegeDetail/collegeDetail.js';

const studentCollegeApplicationUpdateMethod = async (req, res) => {
    
    try {
        
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        const collegeId = req.body.collegeId;
        const studentId = req.body.studentId;
        const subjectId = req.body.subjectId;
        const Status = req.body.Status;
        const note = req.body.note;
        const studentApplyId = req.body.studentApplyId

        const collegeExists = await StudentCollegeApplication.findOne({ collegeId: collegeId ,isDeleted: { $ne: true } });
        if (!collegeExists) {
            return res.status(404).json({ error: 'College not found' });
        }
        const studentExists = await StudentCollegeApplication.findOne({ studentId: studentId ,isDeleted: { $ne: true } });
        if (!studentExists) {
            return res.status(404).json({ error: 'student not found' });
        }
        const subjectExists = await StudentCollegeApplication.findOne({ subjectId: subjectId ,isDeleted: { $ne: true } });
        if (!subjectExists) {
            return res.status(404).json({ error: 'subject not found' });
        }

        const updateData = {
         Status,
         note
        };

        const StudentCollegeApplicationUpdateResult = await StudentCollegeApplication.updateOne(
            { studentApplyId  },
            { $set: updateData }
        );

        if(Status=='accepted'){
            await collegeDetailModel.updateOne(
                { collegeId: collegeId },
                { $inc: { totalAdmission: 1 ,appliedAdmission:-1} },
            ); 
        }

        if(Status=='rejected'){
            await collegeDetailModel.updateOne(
                { collegeId: collegeId },
                { $inc: { totalAdmission: -1, appliedAdmission:-1 } }
            ); 
        }
        res.status(200).json({
            message: "StudentCollegeApplication link details updated successfully",
            StudentCollegeApplicationUpdateResult
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating StudentCollegeApplication link details", error });
        console.log(error);
    }
}

export default studentCollegeApplicationUpdateMethod;
