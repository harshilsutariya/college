import uuid4 from 'uuid4';
import collegeModel from "../../model/collegeDetail/collegeDetail.js";
import sportDetailModel from "../../model/collegeDetail/sports.js";
import { fileUrl } from '../../utility/fileServerConfig.js';

const sportCreateMethod = async (req, res) => {
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

    let ObjToDocArray = []
    let fileArray = req.files;

console.log(fileArray);

    for (let i in fileArray) {
        let oneObj = {
            collegeId,
            localServerUrl: `${fileUrl}image/${req.files[i].originalname}`,
            moreInfo: moreInfoArray[i],
            imageName: req.files[i].originalname
        };
        ObjToDocArray.push(oneObj);
    }

    ObjToDocArray = ObjToDocArray.map((val) => ({ ...val, sportsId: uuid4() }));

    const sportsData = await sportDetailModel.insertMany(ObjToDocArray);

    res.status(201).send({ message: "success", newdata: sportsData });
} catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
}
};

export default sportCreateMethod;