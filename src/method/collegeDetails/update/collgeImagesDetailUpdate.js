import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import collegeImagesDetailModel from "../../../model/collegeDetail/collegeImages.js"
import { fileUrl } from '../../../utility/fileServerConfig.js';
import bucket from '../../../utility/firebaseutility.js';

const collegeImagesUpdateMethod = async (req, res) => {
    console.log(req.body);
    try {
        
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        let collegeImagesIdArray = req.body.collegeImagesId;
        let collegeIdArray = req.body.collegeId;
        let NameArray = req.body.Name;
        let photoIndexArray = req.body.photoIndex;

        if (!collegeIdArray || !collegeImagesIdArray) {
            return res.status(401).send({ status: "failed", error: "Enter collegeId and collegeImagesId" });
        }

        if (!NameArray || NameArray.length === 0) {
            return res.status(401).send({ status: "failed", error: "Enter Name" });
        }

        if (typeof collegeImagesIdArray === "string") {
            collegeImagesIdArray = [collegeImagesIdArray];
            collegeIdArray = [collegeIdArray];
            NameArray = [NameArray];
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
        const updatedData = collegeImagesIdArray.map(async (val, i) => {
            if (photoIndexArray?.includes(i.toString())) {
                const imageIndex = photoIndexArray.indexOf(i.toString());
                const singleUpdatedRecordStatus = await collegeImagesDetailModel.updateOne(
                    { collegeImagesId: val, collegeId: collegeIdArray[i] },
                    {
                        $set: {
                            localServerUrl: `${fileUrl}/cultural/image/${req.files[imageIndex].originalname}`,
                            imageName: req.files[imageIndex].originalname,
                            Name: NameArray[i]
                        }
                    },
                    { new: true }
                );
                return singleUpdatedRecordStatus;
            } else {
                const singleUpdatedRecordStatus = await collegeImagesDetailModel.updateOne(
                    { collegeImagesId: val, collegeId: collegeIdArray[i] },
                    {
                        $set: {
                            Name: NameArray[i]
                        }
                    },
                    { new: true }
                );
                return singleUpdatedRecordStatus;
            }
        });

        const result = await Promise.all(updatedData);

        res.status(200).send({
            message: "College Images updated successfully",
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

export default collegeImagesUpdateMethod;
