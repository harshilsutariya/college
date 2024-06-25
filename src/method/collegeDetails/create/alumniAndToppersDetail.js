import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import alumniAndToppersDetailModel from "../../../model/collegeDetail/alumniAndToppers.js";
import { fileUrl } from '../../../utility/fileServerConfig.js';
import bucket from '../../../utility/firebaseutility.js';

const alumniAndToppersCreateMethod = async (req, res) => {
    try {
        
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }

        const collegeId = req.body.collegeId;
        let moreInfoArray = req.body.moreInfo;
        let Name = req.body.Name;
        let passingOutYear = req.body.passingOutYear;
        let marks = req.body.marks;

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
        if (typeof Name === "string") {
            Name = [Name];
        }
        if (typeof passingOutYear === "string") {
            passingOutYear = [passingOutYear];
        }
        if (typeof marks === "string") {
            marks = [marks];
        }

        let ObjToDocArray = []
        let fileArray = req.files;

        for (let i in fileArray) {
            const file = fileArray[i];
            // const uniqueName = `${uuid4()}_${file.originalname}`;
            // const folderPath = `academics/${uniqueName}`;
            // const fileUpload = bucket.file(folderPath);

            // await fileUpload.save(file.buffer, {
            //     contentType: file.mimetype,
            //     public: true,
            // });

            // const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueName}`;

            // let imageName = `${uuid4()}_${req.files[i].originalname}`

            let oneObj = {
                collegeId,
                localServerUrl: `${fileUrl}/college/alumniAndToppers/image/${req.files[i].originalname}`,
                moreInfo: moreInfoArray[i],
                Name: Name[i],
                passingOutYear: passingOutYear[i],
                marks: marks[i],
                imageName: req.files[i].originalname,
                // firebaseUrl: publicUrl
            };
            ObjToDocArray.push(oneObj);
        }

        ObjToDocArray = ObjToDocArray.map((val) => ({ ...val, alumniAndtoppersId: uuid4() }));

        const alumniAndToppersData = await alumniAndToppersDetailModel.insertMany(ObjToDocArray);

        res.status(201).send({ message: "success", newdata: alumniAndToppersData });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

export default alumniAndToppersCreateMethod;