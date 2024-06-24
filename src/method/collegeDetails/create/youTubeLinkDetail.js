import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import youTubeLinkDetailModel from '../../../model/collegeDetail/youTubeLink.js';

const youTubeLinkDetailCreateMethod = async (req, res) => {
    try {
        
        const collegeId = req.body.collegeId;
        const youTubeLink1 = req.body.youTubeLink1;
        const youTubeLink2 = req.body.youTubeLink2;
        const youTubeLink3 = req.body.youTubeLink3;
        const youTubeLink4 = req.body.youTubeLink4;
        const youTubeLink5 = req.body.youTubeLink5;

        const collegeExists = await collegeModel.find({ collegeId: collegeId });
        if (collegeExists == 0) {
            return res.status(400).json({ error: 'College ID does not exist' });
        }

        const youTubeLinkExists = await youTubeLinkDetailModel.find({ collegeId: collegeId });
        if (youTubeLinkExists==1) {
            return res.status(400).json({ error: 'youTubeLink is already add for this college' });
        }

        const newyouTubeLinkDetail = new youTubeLinkDetailModel({
            youTubeLinkId: uuid4(),
            collegeId,youTubeLink1,youTubeLink2,youTubeLink3,
            youTubeLink4,youTubeLink5
            
        });

        const youTubeLinkData = await newyouTubeLinkDetail.save();
        res.status(201).json({
            message: "youTube link Detail Add Successfully",
            youTubeLinkData
        });

    }
    catch (error) {
        res.status(500).json({ message: "error" });
    }
}

export default youTubeLinkDetailCreateMethod;