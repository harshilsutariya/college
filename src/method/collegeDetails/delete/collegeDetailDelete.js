import academics from "../../../model/collegeDetail/academics.js"
import alumniAndtoppers from "../../../model/collegeDetail/alumniAndToppers.js"
import collegeDetailModel from "../../../model/collegeDetail/collegeDetail.js"
import collegeImages from "../../../model/collegeDetail/collegeImages.js"
import collegePolicyAndSocialMediaDetailModel from "../../../model/collegeDetail/collegePolicyAndSocialMedia.js"
import cultural from "../../../model/collegeDetail/cultural.js"
import eligibilityAndTermsDetailModel from "../../../model/collegeDetail/eligibilityAndTerms.js"
import highlightsDetailModel from "../../../model/collegeDetail/highlights.js"
import infrastructureDetailModel from "../../../model/collegeDetail/infrastructure.js"
import managementAndStaffDetailModel from "../../../model/collegeDetail/managementAndStaff.js"
import Sport from "../../../model/collegeDetail/sports.js"
import subjectDetailModel from "../../../model/collegeDetail/subjects.js"
import youTubeLinkDetailModel from "../../../model/collegeDetail/youTubeLink.js"


const deleteCollegeDetailMethod = async (req, res) => {
    try {
        
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }
        
        const collegeId = req.params.collegeId;

        const collegeExist = await collegeDetailModel.findOne({ collegeId: collegeId });

        if (!collegeExist) {
            return res.status(404).send({ error: "Please enter a valid collegeId" });
        }

        // Use an object to specify the filter criteria
        await collegeDetailModel.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await infrastructureDetailModel.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await highlightsDetailModel.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await cultural.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await academics.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await alumniAndtoppers.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await collegeImages.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await collegePolicyAndSocialMediaDetailModel.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await eligibilityAndTermsDetailModel.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await managementAndStaffDetailModel.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await Sport.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await subjectDetailModel.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });
        await youTubeLinkDetailModel.updateOne({ collegeId: collegeId }, { $set: { isDeleted: true } });

        res.status(201).send({ message: "College deleted successfully" });

    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", error });
        console.log(error);
    }
}

export default deleteCollegeDetailMethod;
