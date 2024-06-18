import uuid4 from 'uuid4';
import eligibilityAndTermsDetailModel from "../../../model/collegeDetail/eligibilityAndTerms.js";
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";

const eligibilityCreateMethod = async (req, res) => {
    try {
        const collegeId = req.body.collegeId
        const eligibilityCrieria = req.body.eligibilityCrieria;
        const feeterms = req.body.feeterms;

        const collegeExists = await collegeModel.find({ collegeId: collegeId });
        if (collegeExists == 0) {
            return res.status(400).json({ error: 'College ID does not exist' });
        }

        const eligibilityAndTermsExists = await eligibilityAndTermsDetailModel.find({ collegeId: collegeId });
        if (eligibilityAndTermsExists) {
            return res.status(400).json({ error: 'eligibilityAndTerms is already add for this college' });
        }

        const eligibilityAndTermsDetail = new eligibilityAndTermsDetailModel({
            eligibilityAndTermsId: uuid4(),collegeId,
            eligibilityCrieria,feeterms
        });

        const eligibilityAndTermsData = await eligibilityAndTermsDetail.save();
        res.status(201).json({
            message: "eligibilityAndTerms Detail Add Successfully",
            eligibilityAndTermsData
        });

    }
    catch (error) {
        res.status(500).json({ message: "error", error });
    }

}
export default eligibilityCreateMethod;  