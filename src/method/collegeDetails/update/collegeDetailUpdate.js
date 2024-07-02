import uuid4 from 'uuid4';
import collegeDetailModel from '../../../model/collegeDetail/collegeDetail.js';
import { emailRegex, phoneRegex } from '../../../utility/utils.js';
import collegeTeam from '../../../model/admins/collegeAdmins.js';

const collegeDetailUpdateMethod = async (req, res) => {
    try {
        // Role check (uncomment if needed)
        // if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
        //     return res.status(403).send({
        //         status: "failed",
        //         error: "You don't have access"
        //     });
        // }

        const {
            collegeId,
            collegeName,
            email,
            password,
            phone,
            address,
            city,
            area,
            location,
            collegeType,
            systemType,
            academicType,
            affiliated,
            classRooms,
            totalSeats,
            classType,
            collegeCode,
            collegeArea,
            noOfFloors,
            timings,
            historyAndAchievement,
            discriptionBox,
            moreInfo
        } = req.body;

        const existingCollege = await collegeDetailModel.findOne({ collegeId, isDeleted: { $ne: true } });

        if (!existingCollege) {
            return res.status(404).json({ error: 'College not found' });
        }

        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (phone && !phoneRegex.test(phone)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        const emailExistsInOtherCollege = await collegeDetailModel.findOne({ email, collegeId: { $ne: collegeId } });
        if (emailExistsInOtherCollege) {
            return res.status(400).json({ error: 'Email already exists for another college' });
        }

        const phoneExistsInOtherCollege = await collegeDetailModel.findOne({ phone, collegeId: { $ne: collegeId } });
        if (phoneExistsInOtherCollege) {
            return res.status(400).json({ error: 'Phone number already exists for another college' });
        }

        const updatedCollegeDetails = {
            collegeName,
            email,
            password,
            phone,
            address,
            city,
            area,
            location,
            collegeType,
            systemType,
            academicType,
            affiliated,
            classRooms,
            totalSeats,
            classType,
            collegeCode,
            collegeArea,
            noOfFloors,
            timings,
            historyAndAchievement,
            discriptionBox,
            moreInfo
        };

        const updateCollegeTeam = {
            email,
            password,
            role: req.body.role // Assuming role is coming from the request body
        };

        const collegeUpdateData = await collegeDetailModel.updateOne(
            { collegeId },
            { $set: updatedCollegeDetails }
        );

        const collegeTeamUpdateData = await collegeTeam.updateOne(
            { collegeId },
            { $set: updateCollegeTeam }
        );

        res.status(200).json({
            message: "College details updated successfully",
            collegeUpdateData,
            collegeTeamUpdateData
        });

    } catch (error) {
        console.error("Error updating college details: ", error);
        res.status(500).json({ message: "Error updating college details", error });
    }
};

export default collegeDetailUpdateMethod;
