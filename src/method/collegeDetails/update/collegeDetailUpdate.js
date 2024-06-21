import uuid4 from 'uuid4';
import collegeDetailModel from '../../../model/collegeDetail/collegeDetail.js';
import { emailRegex, phoneRegex } from '../../../utility/utils.js';

const collegeDetailUpdateMethod = async (req,res) => {
    try {
        const collegeId  = req.body.collegeId;
        const collegeName = req.body.collegeName;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        const address = req.body.address;
        const city = req.body.city;
        const area = req.body.area;
        const location = req.body.location;
        const collegeType = req.body.collegeType;
        const systemType = req.body.systemType;
        const academicType = req.body.academicType;
        const affiliated = req.body.affiliated;
        const classRooms = req.body.classRooms;
        const totalSeats = req.body.totalSeats;
        const classType = req.body.classType;
        const collegeCode = req.body.collegeCode;
        const collegeArea = req.body.collegeArea;
        const noOfFloors = req.body.noOfFloors;
        const timings = req.body.timings;
        const historyAndAchievement = req.body.historyAndAchievement;
        const discriptionBox = req.body.discriptionBox;
        const moreInfo = req.body.moreInfo;

        
        const existingCollege = await collegeDetailModel.findOne({ collegeId });
        
        if (!existingCollege) {
            return res.status(404).json({ error: 'College not found' });
        }
        
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (phone && !phoneRegex.test(phone)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }
        const collegeWithEmail = await collegeDetailModel.findOne({ collegeId, email });
        if (!collegeWithEmail) {
            const emailExistsInOtherCollege = await collegeDetailModel.findOne({ email, collegeId: { $ne: collegeId } });
            if (emailExistsInOtherCollege) {
                return res.status(400).json({ error: 'Email already exists for another college' });
            }
        }

        const collegeWithPhone = await collegeDetailModel.findOne({ collegeId, phone });
        if (!collegeWithPhone) {
            const phoneExistsInOtherCollege = await collegeDetailModel.findOne({ phone, collegeId: { $ne: collegeId } });
            if (phoneExistsInOtherCollege) {
                return res.status(400).json({ error: 'Phone number already exists for another college' });
            }
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

        const collegeUpdateData = await collegeDetailModel.updateOne(
            { collegeId},
            { $set: updatedCollegeDetails }
        );
        res.status(200).json({
            message: "College details updated successfully",
            collegeUpdateData
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating college details", error });
    }
}

export default collegeDetailUpdateMethod;