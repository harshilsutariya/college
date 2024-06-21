import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import youTubeLinkDetailModel from '../../../model/collegeDetail/youTubeLink.js';

const youTubeLinkDetailUpdateMethod = async (req, res) => {
    try {
        const collegeId = req.body.collegeId;
        const youTubeLinkId = req.body.youTubeLinkId;
        const youTubeLink1 = req.body.youTubeLink1;
        const youTubeLink2 = req.body.youTubeLink2;
        const youTubeLink3 = req.body.youTubeLink3;
        const youTubeLink4 = req.body.youTubeLink4;
        const youTubeLink5 = req.body.youTubeLink5;

        const collegeExists = await collegeModel.findOne({ collegeId });
        if (!collegeExists) {
            return res.status(404).json({ error: 'College not found' });
        }

        const existingYouTubeLinkDetail = await youTubeLinkDetailModel.findOne({ youTubeLinkId });
        
        if (!existingYouTubeLinkDetail) {
            return res.status(404).json({ error: 'YouTube link details not found for update' });
        }

        const updateData = {
            youTubeLink1, 
            youTubeLink2, 
            youTubeLink3, 
            youTubeLink4, 
            youTubeLink5
        };

        const youTubeLinkUpdateResult = await youTubeLinkDetailModel.updateOne(
            { youTubeLinkId, collegeId },
            { $set: updateData }
        );

        res.status(200).json({
            message: "YouTube link details updated successfully",
            youTubeLinkUpdateResult
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating YouTube link details", error });
    }
}

export default youTubeLinkDetailUpdateMethod;
