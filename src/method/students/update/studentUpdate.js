import uuid4 from 'uuid4';
import bcrypt from 'bcrypt';
import studentDetailModel from '../../../model/student/studentRegistration.js';
import { emailRegex, phoneRegex } from '../../../utility/utils.js';

const studentDetailUpdateMethod = async (req, res) => {
    try {

        const studentId = req.body.studentId
        const name = req.body.name;
        const gender = req.body.gender;
        const schoolName = req.body.schoolName;
        const mobile = req.body.mobile;
        const email = req.body.email;

        const existingStudent = await studentDetailModel.findOne({ studentId, isDeleted: { $ne: true } });

        if (!existingStudent) {
            return res.status(404).json({ error: 'student not found' });
        }

        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (mobile && !phoneRegex.test(mobile)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        const emailExists = await studentDetailModel.findOne({
            email,
            studentId: { $ne: studentId }, 
            isDeleted: { $ne: true }
        });

        if (emailExists) {
            return res.status(400).json({ error: 'Email is already in use by another student' });
        }
        const updatedstudentDetails = {
            name,
            email,
            gender,
            schoolName,
        };

        const studentUpdateData = await studentDetailModel.updateOne(
            { studentId },
            { $set: updatedstudentDetails }
        );
        res.status(200).json({
            message: "College details updated successfully",
            studentUpdateData
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating college details", error });
        console.log(error);
    }
}

export default studentDetailUpdateMethod;