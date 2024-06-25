import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import collgeImagesDetailMethod from "../../../model/collegeDetail/collegeImages.js"
import { fileUrl } from '../../../utility/fileServerConfig.js';
import bucket from '../../../utility/firebaseutility.js';

const collgeImagesCreateMethod = async (req, res) => {
    console.log(req.body);
    try {
        
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }

        const collegeId = req.body.collegeId;
        let Name = req.body.Name;

        if (!collegeId) {
            return res.status(401).send({ status: "failed", error: "Enter collegeId" });
        }

        if (!Name || Name.length === 0) {
            return res.status(401).send({ status: "failed", error: "Enter Name" });
        }

        if (!req.files) {
            return res.status(400).send({ error: "No file uploaded" });
        }

        const college = await collegeModel.findOne({ collegeId, isDeleted: { $ne: true } });
        if (!college) {
            return res.status(404).send({ error: "College is not available. Enter correct collegeId." });
        }

        if (typeof Name === "string") {
            Name = [Name];
        }

        let ObjToDocArray = []
        let fileArray = req.files;

        for (let i in fileArray) {
            const file = fileArray[i];
            // const uniqueName = `${uuid4()}_${file.originalname}`;
            // const folderPath = `cultural/${uniqueName}`;
            // const fileUpload = bucket.file(folderPath);

            // await fileUpload.save(file.buffer, {
            //     contentType: file.mimetype,
            //     public: true,
            // });

            // const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueName}`;

            let oneObj = {
                collegeId,
                localServerUrl: `${fileUrl}/college/cultural/image/${req.files[i].originalname}`,
                Name: Name[i],
                imageName: req.files[i].originalname,
                // firebaseUrl: publicUrl
            };

            ObjToDocArray.push(oneObj);  
        }

        ObjToDocArray = ObjToDocArray.map((val) => ({ ...val, collegeImagesId: uuid4() }));

        const collgeImagesData = await collgeImagesDetailMethod.insertMany(ObjToDocArray);

        res.status(201).send({ message: "success", newdata: collgeImagesData });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

export default collgeImagesCreateMethod;