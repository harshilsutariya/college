import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import collegePolicyAndSocialMediaDetailModel from '../../../model/collegeDetail/collegePolicyAndSocialMedia.js';

const collegePolicyAndSocialMediaDetailUpdateMethod = async (req, res) => {
    try {
        const collegeId = req.body.collegeId;
        const collegePolicyAndSocialMedialId = req.body.collegePolicyAndSocialMedialId
        const termsAndconditions = req.body.termsAndconditions;
        const website = req.body.website;
        const facebook = req.body.facebook;
        const youtube = req.body.youtube;
        const instagram = req.body.instagram;

        const existingCollege = await collegeModel.findOne({ collegeId });
        if (!existingCollege) {
            return res.status(404).json({ error: 'College not found' });
        }

        const existingDetails = await collegePolicyAndSocialMediaDetailModel.findOne({ collegePolicyAndSocialMedialId });

        if (!existingDetails) {
            return res.status(404).json({ error: 'No existing policy and social media details found for update' });
        }

        const updateData = {
            termsAndconditions,
            website,
            facebook,
            youtube,
            instagram
        };

        const collegepolicyUpdateData = await collegePolicyAndSocialMediaDetailModel.updateOne(
            { collegePolicyAndSocialMedialId , collegeId},
            { $set: updateData }
        );
        res.status(200).json({
            message: "Policy and Social Media details updated successfully",
            collegepolicyUpdateData
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating policy and social media details", error });
    }
}

export default collegePolicyAndSocialMediaDetailUpdateMethod;
