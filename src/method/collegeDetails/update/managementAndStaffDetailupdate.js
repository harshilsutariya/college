import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import managementAndStaffModel from "../../../model/collegeDetail/managementAndStaff.js";
import { fileUrl } from '../../../utility/fileServerConfig.js';
import bucket from '../../../utility/firebaseutility.js';

const managementAndStaffUpdateMethod = async (req, res) => {
    try {
        
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        const managementAndStaffId = req.body.managementAndStaffId;
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

        const updateFields = {
            Name,
            qualification,
            experience,
            designation,
            about
        };

        if (req.file) {
            updateFields.profilePicture = req.file.filename;
            updateFields.localServerUrl = `${fileUrl}/managementAndStaff/image/${req.file.originalname}`;
        }

        const updatedManagementAndStaff = await managementAndStaffModel.findOneAndUpdate(
            { managementAndStaffId, collegeId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedManagementAndStaff) {
            return res.status(404).send({ error: "Management or Staff member not found." });
        }

        res.status(200).json({
            message: "Management and Staff details updated successfully",
            updatedManagementAndStaff
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error", error });
    }
};

export default managementAndStaffUpdateMethod;
