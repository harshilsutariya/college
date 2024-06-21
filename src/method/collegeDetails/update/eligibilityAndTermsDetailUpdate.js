import uuid4 from 'uuid4';
import eligibilityAndTermsDetailModel from "../../../model/collegeDetail/eligibilityAndTerms.js";
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";

const eligibilityUpdateMethod = async (req, res) => {
    try {
        const eligibilityAndTermsId = req.body.eligibilityAndTermsId;
        const collegeId = req.body.collegeId;
        const eligibilityCriteria = req.body.eligibilityCriteria;
        const feeTerms = req.body.feeTerms;

        const collegeExists = await collegeModel.findOne({ collegeId });
        if (!collegeExists) {
            return res.status(404).json({ error: 'College ID does not exist' });
        }

        const existingEligibilityAndTerms = await eligibilityAndTermsDetailModel.findOne({ eligibilityAndTermsId });
        if (!existingEligibilityAndTerms) {
            return res.status(404).json({ error: 'Eligibility and Terms details not found for update' });
        }

        const updateData = {
            eligibilityCriteria,
            feeTerms
        };

        const eligibilityAndTermsUpdateResult = await eligibilityAndTermsDetailModel.updateOne(
            { eligibilityAndTermsId },
            { $set: updateData }
        );

        if (eligibilityAndTermsUpdateResult.modifiedCount === 0) {
            return res.status(404).json({ error: 'No updates performed. The provided data may be the same as existing data.' });
        }

        res.status(200).json({
            message: "Eligibility and Terms details updated successfully",
            eligibilityAndTermsUpdateResult
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Error updating Eligibility and Terms details", error: error.message });
    }
};

export default eligibilityUpdateMethod;
