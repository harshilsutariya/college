import uuid4 from 'uuid4';
import highlightsDetailModel from '../../model/collegeDetail/highlights.js'
import collegeModel from "../../model/collegeDetail/collegeDetail.js";

const highlightDetailCreateMethod = async (req, res) => {
    try {
        const collegeId = req.body.collegeId;
        const skillDevelopment = req.body.skillDevelopment;
        const careerCounselling = req.body.careerCounselling;
        const scholarship = req.body.scholarship;
        const safetySecurity = req.body.safetySecurity;

        const collegeExists = await collegeModel.find({ collegeId: collegeId });
        if (collegeExists == 0) {
            return res.status(400).json({ error: 'College ID does not exist' });
        }

        const highlightExists = await highlightsDetailModel.find({ collegeId: collegeId });
        if (highlightExists) {
            return res.status(400).json({ error: 'highlight is already add for this college' });
        }

        const highlightDetail = new highlightsDetailModel({
            highlightsId: uuid4(),
            collegeId, skillDevelopment, careerCounselling, scholarship, safetySecurity
        });
        const highlightsData = await highlightDetail.save();
        res.status(201).json({
            message: "highlight Detail Add Successfully",
            highlightsData
        });
    }
    catch (error) {
        res.status(500).json({ message: "error" });
    }
}

export default highlightDetailCreateMethod;