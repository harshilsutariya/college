import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import alumniAndToppersDetailModel from "../../../model/collegeDetail/alumniAndToppers.js";
import { fileUrl } from '../../../utility/fileServerConfig.js';
import bucket from '../../../utility/firebaseutility.js';

const alumniAndToppersUpdateMethod = async (req, res) => {
    try {
        
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        let alumniAndtoppersIdArray = req.body.alumniAndtoppersId;
        let collegeIdArray = req.body.collegeId;
        let moreInfoArray = req.body.moreInfo;
        let NameArray = req.body.Name;
        let passingOutYearArray = req.body.passingOutYear;
        let marksArray = req.body.marks;
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

        if (typeof alumniAndtoppersIdArray === "string") {
            alumniAndtoppersIdArray = [alumniAndtoppersIdArray];
            collegeIdArray = [collegeIdArray];
            moreInfoArray = [moreInfoArray];
            NameArray = [NameArray];
            passingOutYearArray = [passingOutYearArray];
            marksArray = [marksArray];
            photoIndexArray = [photoIndexArray];
        }

        // Use map to update multiple records
        const updatedData = alumniAndtoppersIdArray.map(async (val, i) => {
            if (photoIndexArray?.includes(i.toString())) {
                const imageIndex = photoIndexArray.indexOf(i.toString());
                const singleUpdatedRecordStatus = await alumniAndToppersDetailModel.updateOne(
                    { alumniAndtoppersId: val, collegeId: collegeIdArray[i] },
                    {
                        $set: {
                            imageUrl: `${fileUrl}/alumniAndToppers/image/${req.files[imageIndex].originalname}`,
                            imageName: req.files[imageIndex].originalname,
                            moreInfo: moreInfoArray[i],
                            Name: NameArray[i],
                            passingOutYear: passingOutYearArray[i],
                            marks: marksArray[i]
                        }
                    },
                    { new: true }
                );
                return singleUpdatedRecordStatus;
            } else {
                const singleUpdatedRecordStatus = await alumniAndToppersDetailModel.updateOne(
                    { alumniAndtoppersId: val, collegeId: collegeIdArray[i] },
                    {
                        $set: {
                            moreInfo: moreInfoArray[i],
                            Name: NameArray[i],
                            passingOutYear: passingOutYearArray[i],
                            marks: marksArray[i]
                        }
                    },
                    { new: true }
                );
                return singleUpdatedRecordStatus;
            }
        });

        const result = await Promise.all(updatedData);

        res.status(200).send({
            message: "Alumni and Toppers updated successfully",
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

export default alumniAndToppersUpdateMethod;
    