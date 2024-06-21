import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import subjectdetailsModel from '../../../model/collegeDetail/subjects.js';

const subjectsDetailUpdateMethod = async (req, res) => {
    try {
        console.log(req.body);
        const collegeId = req.body.collegeId;
        const subjectId = req.body.subjectId;
        const subjectName = req.body.subjectName;
        const description = req.body.description;
        const minimumFees = req.body.minimumFees;
        const maximumFees = req.body.maximumFees;
        const noOfSeats = req.body.noOfSeats;

        const collegeExists = await collegeModel.findOne({ collegeId: collegeId });
        if (!collegeExists) {
            return res.status(404).json({ error: 'College ID does not exist' });
        }

        const existingSubject = await subjectdetailsModel.findOne({ subjectId });
        if (!existingSubject) {
            return res.status(404).json({ error: 'Subject ID not found for update' });
        }

        const updateData = {
            subjectName,
            description,
            minimumFees,
            maximumFees,
            noOfSeats
        };

        const subjectUpdateResult = await subjectdetailsModel.updateOne(
            { subjectId },
            { $set: updateData }
        );

        res.status(200).json({
            message: "Subject details updated successfully",
            subjectUpdateResult
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Error updating subject details", error: error.message });
    }
}

export default subjectsDetailUpdateMethod;
