import uuid4 from 'uuid4';
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";
import subjectdetailsModel from '../../../model/collegeDetail/subjects.js'

const subjectsDetailCreateMethod = async (req, res) => {
    try {
        
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }

        console.log(req.body);
        const collegeId = req.body.collegeId;
        const subjectName = req.body.subjectName;
        const description = req.body.description;
        const minimumFees = req.body.minimumFees;
        const maximumFees = req.body.maximumFees;
        const noOfSeats = req.body.noOfSeats;

        const collegeExists = await collegeModel.find({ collegeId: collegeId });
        if (collegeExists == 0) {
            return res.status(400).json({ error: 'College ID does not exist' });
        }

        const newsubject = new subjectdetailsModel({
            subjectId: uuid4(),collegeId,subjectName,
            description,minimumFees,maximumFees,noOfSeats
        });

        const subjectData = await newsubject.save();
        res.status(201).json({
            message: "subject Detail Add Successfully",
            subjectData
        });

    }
    catch (error) {
        
        res.status(500).json({ message: "error",error });
    }
}

export default subjectsDetailCreateMethod