import uuid4 from 'uuid4';
import collegeDetailModel from '../../../model/collegeDetail/collegeDetail.js';
import { emailRegex, phoneRegex } from '../../../utility/utils.js';

const collegeDetailCreateMethod = async (req, res) => {
    try {
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

        if (collegeName == null || email == null || password == null || phone == null || address == null || city == null || area == null ||
            location == null || collegeType == null || systemType == null || academicType == null || affiliated == null ||
            classRooms == null || totalSeats == null || classType == null || collegeCode == null || collegeArea == null ||
            noOfFloors == null || timings == null || historyAndAchievement == null || discriptionBox == null || moreInfo == null) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        const existingCollegeWithEmail = await collegeDetailModel.findOne({ email });
        const existingCollegeWithPhone = await collegeDetailModel.findOne({ phone });

        if (existingCollegeWithEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        if (existingCollegeWithPhone) {
            return res.status(400).json({ error: 'Phone number already exists' });
        }

        const newCollege = new collegeDetailModel({
            collegeId: uuid4(),
            collegeName, email, password, phone, address, city, area,
            location, collegeType, systemType, academicType, affiliated,
            classRooms, totalSeats, classType, collegeCode, collegeArea,
            noOfFloors, timings, historyAndAchievement, discriptionBox, moreInfo
        });

        const collegeData = await newCollege.save();
        res.status(201).json({
            message: "College Detail Add Successfully",
            collegeData
        });

    }
    catch (error) {
        res.status(500).json({ message: "error" });
    }
}

export default collegeDetailCreateMethod