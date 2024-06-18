import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import managementAndStaffModel from "../../../model/collegeDetail/managementAndStaff.js"
import { fileUrl } from '../../../utility/fileServerConfig.js';
import bucket from '../../../utility/firebaseutility.js';

const managementAndStaffMethod = async (req, res) => {
    try {
        const collegeId = req.body.collegeId;
        const Name = req.body.Name;
        const qualification = req.body.qualification;
        const total = req.body.total;
        const current = req.body.current;
        const designation = req.body.designation;
        const about = req.body.about;
        const experience = { total, current };

        const college = await collegeModel.findOne({ collegeId, isDeleted: { $ne: true } });
        if (!college) {
            return res.status(404).send({ error: "College is not available. Enter correct collegeId." });
        }

        const newmanagementAndStaff = new managementAndStaffModel({
            managementAndStaffId: uuid4(),
            collegeId,
            profilePicture: req.file.filename,
            localServerUrl: `${fileUrl}/managementAndStaff/image/${req.file.originalname}`,
            Name,
            qualification,
            experience,
            designation,
            about
        });

        const newmanagementAndStaffData = await newmanagementAndStaff.save();
        res.status(201).json({
            message: "subject Detail Add Successfully",
            newmanagementAndStaffData
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error", error });
    }
};

export default managementAndStaffMethod;