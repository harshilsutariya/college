import uuid4 from 'uuid4';
import fs from 'fs';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import sportDetailModel from "../../../model/collegeDetail/sports.js";
import { fileUrl } from '../../../utility/fileServerConfig.js';
import bucket from '../../../utility/firebaseutility.js';

const sportUpdateMethod = async (req, res) => {
    try {
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }

        let sportsIdArray = req.body.sportsId;
        let collegeIdArray = req.body.collegeId;
        let moreInfoArray = req.body.moreInfo;
        let photoIndexArray = req.body.photoIndex;

        // Check if colleges exist
        const colleges = await collegeModel.find({ collegeId: { $in: collegeIdArray }, isDeleted: { $ne: true } });
        if (colleges.length === 0) {
            return res.status(404).json({ error: 'One or more colleges are not available, enter correct college ids.' });
        }

        // Validate the received data
        if (typeof sportsIdArray === "string") {
            sportsIdArray = [sportsIdArray];
            collegeIdArray = [collegeIdArray];
            moreInfoArray = [moreInfoArray];
            photoIndexArray = [photoIndexArray];
        }

        let fileArray = req.files || [];
        console.log('Received files:', fileArray);

        let updatedData = sportsIdArray.map(async (val, i) => {
            let updateFields = { moreInfo: moreInfoArray[i] };

            if (photoIndexArray?.includes(i.toString())) {
                const imageIndex = photoIndexArray.indexOf(i.toString());
                const file = fileArray[imageIndex];

                if (file) {
                    const uniqueName = `${uuid4()}_${file.originalname}`;
                    const folderPath = `sports/${uniqueName}`;
                    const fileUpload = bucket.file(folderPath);

                    console.log(`Uploading file: ${file.originalname} to ${folderPath}`);

                    // Read file from the file system
                    const fileBuffer = fs.readFileSync(file.path);

                    await fileUpload.save(fileBuffer, {
                        contentType: file.mimetype,
                        public: true,
                    });

                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/sports/${uniqueName}`;

                    updateFields.firebaseUrl = publicUrl;
                    updateFields.imageName = file.originalname;
                } else {
                    console.error(`File at index ${imageIndex} is undefined`);
                }
            }

            const singleUpdatedRecordStatus = await sportDetailModel.updateOne(
                { sportsId: val, collegeId: collegeIdArray[i] },
                { $set: updateFields },
                { new: true }
            );
            return singleUpdatedRecordStatus;
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
