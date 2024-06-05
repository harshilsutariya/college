import uuid4 from 'uuid4';
import collegeModel from "../../model/collegeDetail/collegeDetail.js";
import academicsDetailMethod from '../../model/collegeDetail/academics.js';
import { fileUrl } from '../../utility/fileServerConfig.js';
import bucket from '../../utility/firebaseutility.js'; // Import the bucket instance

const academicsCreateMethod = async (req, res) => {
    try {
        const collegeId = req.body.collegeId;
        let moreInfoArray = req.body.moreInfo;

        if (!collegeId) {
            return res.status(401).send({ status: "failed", error: "Enter collegeId" });
        }

        if (!moreInfoArray || moreInfoArray.length === 0) {
            return res.status(401).send({ status: "failed", error: "Enter moreInfo" });
        }

        if (!req.files) {
            return res.status(400).send({ error: "No file uploaded" });
        }

        const college = await collegeModel.findOne({ collegeId, isDeleted: { $ne: true } });
        if (!college) {
            return res.status(404).send({ error: "College is not available. Enter correct collegeId." });
        }

        if (typeof moreInfoArray === "string") {
            moreInfoArray = [moreInfoArray];
        }

        let ObjToDocArray = [];
        let fileArray = req.files;

        for (let i in fileArray) {
            const file = fileArray[i];
            const uniqueName = `${uuid4()}_${file.originalname}`;
            const fileUpload = bucket.file(uniqueName);

            await fileUpload.save(file.buffer, {
                contentType: file.mimetype,
                public: true,
            });

            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueName}`;

            let oneObj = {
                collegeId,
                localServerUrl: `${fileUrl}image/${file.originalname}`,
                moreInfo: moreInfoArray[i],
                imageName: file.originalname,
                firebaseUrl: publicUrl
            };

            ObjToDocArray.push(oneObj);
        }

        ObjToDocArray = ObjToDocArray.map((val) => ({ ...val, academicsId: uuid4() }));

        const academicsData = await academicsDetailMethod.insertMany(ObjToDocArray);

        res.status(201).send({ message: "success", newdata: academicsData });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

export default academicsCreateMethod;
