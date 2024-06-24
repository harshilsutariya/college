import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import culturalDetailModel from "../../../model/collegeDetail/cultural.js";
import { fileUrl } from '../../../utility/fileServerConfig.js';
import bucket from '../../../utility/firebaseutility.js';

const culturalUpdateMethod = async (req, res) => {
    try {
        
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        let culturalIdArray = req.body.culturalId;
        let collegeIdArray = req.body.collegeId;
        let moreInfoArray = req.body.moreInfo;
        let photoIndexArray = req.body.photoIndex;

        if (!collegeIdArray || !culturalIdArray) {
            return res.status(401).send({ status: "failed", error: "Enter collegeId and culturalId" });
        }

        if (!moreInfoArray || moreInfoArray.length === 0) {
            return res.status(401).send({ status: "failed", error: "Enter moreInfo" });
        }

        if (typeof culturalIdArray === "string") {
            culturalIdArray = [culturalIdArray];
            collegeIdArray = [collegeIdArray];
            moreInfoArray = [moreInfoArray];
            photoIndexArray = [photoIndexArray];
        }

        // Check if colleges exist
        const colleges = await collegeModel.find({ collegeId: { $in: collegeIdArray }, isDeleted: { $ne: true } });
        if (colleges.length === 0) {
            return res.status(404).send({
                error: "One or more colleges are not available, enter correct college ids."
            });
        }

        // Use map to update multiple records
        const updatedData = culturalIdArray.map(async (val, i) => {
            if (photoIndexArray?.includes(i.toString())) {
                const imageIndex = photoIndexArray.indexOf(i.toString());
                const singleUpdatedRecordStatus = await culturalDetailModel.updateOne(
                    { culturalId: val, collegeId: collegeIdArray[i] },
                    {
                        $set: {
                            localServerUrl: `${fileUrl}/cultural/image/${req.files[imageIndex].originalname}`,
                            imageName: req.files[imageIndex].originalname,
                            moreInfo: moreInfoArray[i]
                        }
                    },
                    { new: true }
                );
                return singleUpdatedRecordStatus;
            } else {
                const singleUpdatedRecordStatus = await culturalDetailModel.updateOne(
                    { culturalId: val, collegeId: collegeIdArray[i] },
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
            message: "Cultural details updated successfully",
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

export default culturalUpdateMethod;
