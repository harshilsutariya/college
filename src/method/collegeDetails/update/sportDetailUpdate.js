import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import sportDetailModel from "../../../model/collegeDetail/sports.js";
import { fileUrl } from '../../../utility/fileServerConfig.js';

const sportUpdateMethod = async (req, res) => {
    try {
        let sportsIdArray = req.body.sportsId;
        let collegeIdArray = req.body.collegeId;
        let moreInfoArray = req.body.moreInfo;
        let photoIndexArray = req.body.photoIndex;
        console.log("Searching for colleges with IDs:", collegeIdArray);

        // Check if colleges exist
        const colleges = await collegeModel.find({ collegeId: { $in: collegeIdArray }, isDeleted: { $ne: true } });
        console.log("Colleges found:", colleges);
        if (colleges.length === 0) {
            return res.status(404).json({ error: 'One or more colleges are not available, enter correct college ids.' });
        }        

        console.log(colleges);
        // Validate the received data
        if (colleges.length === 0) {
            res.status(404).send({
                error: "One or more colleges are not available, enter correct college ids."
            });
            return;
        }

        if (typeof sportsIdArray === "string") {
            sportsIdArray = [sportsIdArray];
            collegeIdArray = [collegeIdArray];
            moreInfoArray = [moreInfoArray];
            photoIndexArray = [photoIndexArray];
        }

        // Use map to update multiple records
        const updatedData = sportsIdArray.map(async (val, i) => {
            if (photoIndexArray?.includes(i.toString())) {
                const imageIndex = photoIndexArray.indexOf(i.toString());
                const singleUpdatedRecordStatus = await sportDetailModel.updateOne(
                    { sportsId: val, collegeId: collegeIdArray[i] },
                    {
                        $set: {
                            imageUrl: `${fileUrl}/sport/image/${req.files[imageIndex].originalname}`,
                            imageName: req.files[imageIndex].originalname,
                            moreInfo: moreInfoArray[i]
                        }
                    },
                    { new: true }
                );
                return singleUpdatedRecordStatus;
            } else {
                const singleUpdatedRecordStatus = await sportDetailModel.updateOne(
                    { sportsId: val, collegeId: collegeIdArray[i] },
                    {
                        $set: {
                            moreInfo: moreInfoArray[i]
                        }
                    },
                    { new: true }
                );
                return singleUpdatedRecordStatus;
            }
        });

        const result = await Promise.all(updatedData);

        res.status(200).send({
            message: "Sports updated successfully",
            data: result
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: "error",
            error: "Internal server error"
        });
    }
};

export default sportUpdateMethod;
