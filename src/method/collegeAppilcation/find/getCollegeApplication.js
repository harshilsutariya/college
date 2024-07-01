import collegeDetailModel from "../../../model/collegeDetail/collegeDetail.js";
import subjectDetailModel from "../../../model/collegeDetail/subjects.js";
import StudentCollegeApplication from "../../../model/student/studentCollegeApplication.js";

export const getAllStudentCollegeApplicationMethod = async (req, res) => {

    try {

        // if (!(req.role === 'superadmin'  || req.role === 'supermoderator' || req.roole ==='superViewer')) {
        //     return res.status(403).send({
        //         status: "failed",
        //         error: "You don't have access"
        //     });
        // }

        const studentCollegeApplicationData = await StudentCollegeApplication.find({ isDeleted: { $ne: true } });

        // Check if studentCollegeApplicationData exists and is an array
        if (!studentCollegeApplicationData || studentCollegeApplicationData.length === 0) {
            return res.status(404).json({ status: "failed", error: "No student college applications found" });
        }

        // Fetch college details for each application
        const applicationDetails = await Promise.all(
            studentCollegeApplicationData.map(async (application) => {
                const college = await collegeDetailModel.findOne({ collegeId: application.collegeId, isDeleted: { $ne: true } });
                const subject = await subjectDetailModel.findOne({ subjectId: application.subjectId, isDeleted: { $ne: true } });
                if (college && subject) {
                    return {
                        ...application.toObject(), 
                        collegeName: college.collegeName,
                        collegeType: college.collegeType,
                        subjectName : subject.subjectName
                    };
                } else {
                    return {
                        ...application.toObject(),
                        collegeName: null,
                        collegeType: null,
                        subjectName:null
                    };
                }
            })
        );

        res.status(200).json({applicationDetails });
    } catch (error) {
        console.error("Error fetching StudentCollegeApplication details: ", error);
        res.status(500).json({ message: "Failed to retrieve StudentCollegeApplication details" });
    }
};

export const getSpecificCollegeStudentApplicationMethod = async (req, res) => {

    try {

        // if (!(req.role === 'superadmin'  || req.role === 'supermoderator' || req.roole ==='superViewer')) {
        //     return res.status(403).send({
        //         status: "failed",
        //         error: "You don't have access"
        //     });
        // }

        const collegeId = req.params.collegeId;

        const StudentCollegeApplyData = await StudentCollegeApplication.find({ collegeId, isDeleted: { $ne: true } });

        const applicationDetails = await Promise.all(
            StudentCollegeApplyData.map(async (application) => {
                const college = await collegeDetailModel.findOne({ collegeId: application.collegeId, isDeleted: { $ne: true } });
                const subject = await subjectDetailModel.findOne({ subjectId: application.subjectId, isDeleted: { $ne: true } });
                if (college && subject) {
                    return {
                        ...application.toObject(), 
                        collegeName: college.collegeName,
                        collegeType: college.collegeType,
                        subjectName : subject.subjectName
                    };
                } else {
                    return {
                        ...application.toObject(),
                        collegeName: null,
                        collegeType: null,
                        subjectName:null
                    };
                }
            })
        );

        res.status(200).json({applicationDetails });

    } catch (error) {
        console.error("Error fetching StudentCollegeApply details: ", error);
        res.status(500).json({ message: "Failed to retrieve StudentCollegeApply details" });
    }
};


export const getspecificStudentCollegeApplicationMethod = async (req, res) => {

    try {

        // if (!(req.role === 'superadmin'  || req.role === 'supermoderator' || req.roole ==='superViewer')) {
        //     return res.status(403).send({
        //         status: "failed",
        //         error: "You don't have access"
        //     });
        // }
        const studentApplyId = req.params.studentApplyId;
        const CollegeStudentApplicationData = await StudentCollegeApplication.find({studentApplyId, isDeleted: { $ne: true } });

        // Check if studentCollegeApplicationData exists and is an array
        if (!CollegeStudentApplicationData || CollegeStudentApplicationData.length === 0) {
            return res.status(404).json({ status: "failed", error: "No student applications found" });
        }

        // Fetch college details for each application
        const applicationDetails = await Promise.all(
            CollegeStudentApplicationData.map(async (application) => {
                const college = await collegeDetailModel.findOne({ collegeId: application.collegeId, isDeleted: { $ne: true } });
                const subject = await subjectDetailModel.findOne({ subjectId: application.subjectId, isDeleted: { $ne: true } });
                if (college && subject) {
                    return {
                        ...application.toObject(), 
                        collegeName: college.collegeName,
                        collegeType: college.collegeType,
                        subjectName : subject.subjectName
                    };
                } else {
                    return {
                        ...application.toObject(),
                        collegeName: null,
                        collegeType: null,
                        subjectName:null
                    };
                }
            })
        );

        res.status(200).json({applicationDetails });
    } catch (error) {
        console.error("Error fetching StudentCollegeApplication details: ", error);
        res.status(500).json({ message: "Failed to retrieve StudentCollegeApplication details" });
    }
};

export default { getAllStudentCollegeApplicationMethod, getSpecificCollegeStudentApplicationMethod ,getspecificStudentCollegeApplicationMethod }