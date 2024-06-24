import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import academicsDetailModel from "../../../model/collegeDetail/academics.js";
import { fileUrl } from '../../../utility/fileServerConfig.js';

const academicsUpdateMethod = async (req, res) => {
    try {
                
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        let academicsIdArray = req.body.academicsId;
        let collegeIdArray = req.body.collegeId;
        let moreInfoArray = req.body.moreInfo;
        let photoIndexArray = req.body.photoIndex;

        // Check if colleges exist
        const colleges = await collegeModel.find({ collegeId: { $in: collegeIdArray }, isDeleted: { $ne: true } });

        // Validate the received data
        if (colleges.length === 0) {
            res.status(404).send({
                error: "One or more colleges are not available, enter correct college ids."
            });
            return;
        }

        if (typeof academicsIdArray === "string") {
            academicsIdArray = [academicsIdArray];
            collegeIdArray = [collegeIdArray];
            moreInfoArray = [moreInfoArray];
            photoIndexArray = [photoIndexArray];
        }

        // Use map to update multiple records
        const updatedData = academicsIdArray.map(async (val, i) => {
            if (photoIndexArray?.includes(i.toString())) {
                const imageIndex = photoIndexArray.indexOf(i.toString());
                const singleUpdatedRecordStatus = await academicsDetailModel.updateOne(
                    { academicsId: val, collegeId: collegeIdArray[i] },
                    {
                        $set: {
                            imageUrl: `${fileUrl}/academics/image/${req.files[imageIndex].originalname}`,
                            imageName: req.files[imageIndex].originalname,
                            moreInfo: moreInfoArray[i]
                        }
                    },
                    { new: true }
                );
                return singleUpdatedRecordStatus;
            } else {
                const singleUpdatedRecordStatus = await academicsDetailModel.updateOne(
                    { academicsId: val, collegeId: collegeIdArray[i] },
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
            message: "Academic details updated successfully",
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

export default academicsUpdateMethod;
