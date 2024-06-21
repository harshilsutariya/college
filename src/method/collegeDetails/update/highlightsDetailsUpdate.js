import uuid4 from 'uuid4';
import highlightsDetailModel from '../../../model/collegeDetail/highlights.js';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";

const highlightDetailUpdateMethod = async (req, res) => {
    try {
        const highlightsId = req.body.highlightsId;
        const collegeId = req.body.collegeId;
        const skillDevelopment = req.body.skillDevelopment;
        const careerCounselling = req.body.careerCounselling;
        const scholarship = req.body.scholarship;
        const safetySecurity = req.body.safetySecurity;

        const collegeExists = await collegeModel.findOne({ collegeId });
        if (!collegeExists) {
            return res.status(404).json({ error: 'College ID does not exist' });
        }

        const existingHighlight = await highlightsDetailModel.findOne({ highlightsId });
        if (!existingHighlight) {
            return res.status(404).json({ error: 'Highlight details not found for update' });
        }

        const updateData = {
            skillDevelopment,
            careerCounselling,
            scholarship,
            safetySecurity
        };

        const highlightsUpdateResult = await highlightsDetailModel.updateOne(
            { highlightsId },
            { $set: updateData }
        );

        if (highlightsUpdateResult.modifiedCount === 0) {
            return res.status(404).json({ error: 'No updates performed. The provided data may be the same as existing data.' });
        }

        res.status(200).json({
            message: "Highlight details updated successfully",
            highlightsUpdateResult
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Error updating highlight details", error: error.message });
    }
};

export default highlightDetailUpdateMethod;
