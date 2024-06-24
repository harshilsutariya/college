    import uuid4 from 'uuid4';
    import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
    import collegePolicyAndSocialMediaDetailModel from '../../../model/collegeDetail/collegePolicyAndSocialMedia.js';

    const collegePolicyAndSocialMediaDetailCreateMethod = async (req, res) => {
        try {
            
            const collegeId = req.body.collegeId;
            const termsAndconditions = req.body.termsAndconditions;
            const website = req.body.website;
            const facebook = req.body.facebook;
            const youtube = req.body.youtube;
            const instagram = req.body.instagram;

            const collegeExists = await collegeModel.find({ collegeId: collegeId });
            if (collegeExists == 0) {
                return res.status(400).json({ error: 'College ID does not exist' });
            }

            const collegePolicyAndSocialMediaExists = await collegePolicyAndSocialMediaDetailModel.find({ collegeId: collegeId });
            if (collegePolicyAndSocialMediaExists==1) {
                return res.status(400).json({ error: 'collegePolicyAndSocialMedia is already add for this college' });
            }

            const newcollegePolicyAndSocialMediaDetail = new collegePolicyAndSocialMediaDetailModel({
                collegePolicyAndSocialMedialId: uuid4(),
                collegeId,termsAndconditions,website,facebook,
                youtube,instagram       
            });

            const newcollegePolicyAndSocialMediaData = await newcollegePolicyAndSocialMediaDetail.save();
            res.status(201).json({
                message: "youTube link Detail Add Successfully",
                newcollegePolicyAndSocialMediaData
            });

        }
        catch (error) {
            res.status(500).json({ message: "error" });
        }
    }

    export default collegePolicyAndSocialMediaDetailCreateMethod;