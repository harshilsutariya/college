import uuid4 from 'uuid4';
import StudentCollegeApplication from "../../../model/student/studentCollegeApplication.js";
import collegeDetailModel from '../../../model/collegeDetail/collegeDetail.js';

const studentCollegeApplicationUpdateMethod = async (req, res) => {
    try {
        // const { role } = req;
        // if (!(role === 'superadmin' || role === 'collegeAdmin' || role === 'supermoderator')) {
        //     return res.status(403).send({
        //         status: "failed",
        //         error: "You don't have access"
        //     });
        // }

        const { collegeId, studentId, subjectId, Status, note, studentApplyId } = req.body;

        const collegeExists = await StudentCollegeApplication.findOne({ collegeId, studentId, subjectId, studentApplyId, isDeleted: { $ne: true } });
        if (!collegeExists) {
            return res.status(404).json({ error: 'Application not found' });
        }

        if (collegeExists && collegeExists.createdAt == collegeExists.updatedAt) {
            const updateData = {
                Status,
                note,
                updatedAt: Date.now()
            };

            const StudentCollegeApplicationUpdateResult = await StudentCollegeApplication.updateOne(
                { studentApplyId },
                { $set: updateData }
            );

            if (Status === 'accept') {
                await collegeDetailModel.updateOne(
                    { collegeId },
                    { $inc: { totalAdmission: 1, appliedAdmission: -1 } }
                );
            }

            if (Status === 'rejected') {
                await collegeDetailModel.updateOne(
                    { collegeId },
                    { $inc: { totalAdmission: -1, appliedAdmission: -1 } }
                );
            }

            return res.status(200).json({
                message: "StudentCollegeApplication link details updated successfully",
                StudentCollegeApplicationUpdateResult
            });
        }else{
            res.status(500).json({ message: "you have already updated status" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating StudentCollegeApplication link details", error });
        console.log(error);
    }
};

export default studentCollegeApplicationUpdateMethod;
