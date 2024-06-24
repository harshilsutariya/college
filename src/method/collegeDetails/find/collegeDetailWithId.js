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

export const getSpecificCollegeDetailMethod = async (req, res) => {
    const { collegeId } = req.params;

    try {
        const activeColleges = await collegeDetailModel.find({ isDeleted: { $ne: true } });

        if (activeColleges.length === 0) {
            return res.status(404).send({ message: "No active colleges found." });
        }else{
            const results = await Promise.all([
                collegeDetailModel.find({ collegeId }),
                infrastructureDetailModel.find({ collegeId }),
                academics.find({ collegeId }),
                alumniAndtoppers.find({ collegeId }),
                collegeImages.find({ collegeId }),
                collegePolicyAndSocialMediaDetailModel.find({ collegeId }),
                cultural.find({ collegeId }),
                eligibilityAndTermsDetailModel.find({ collegeId }),
                highlightsDetailModel.find({ collegeId }),
                managementAndStaffDetailModel.find({ collegeId }),
                Sport.find({ collegeId }),
                subjectDetailModel.find({ collegeId }),
                youTubeLinkDetailModel.find({ collegeId })
            ]);
    
            res.status(200).json({
                collegeDetails: results[0],
                infrastructure: results[1],
                academics: results[2],
                alumniAndToppers: results[3],
                images: results[4],
                policyAndSocialMedia: results[5],
                culturalDetails: results[6],
                eligibilityAndTerms: results[7],
                highlights: results[8],
                managementAndStaff: results[9],
                sports: results[10],
                subjects: results[11],
                youtubeLinks: results[12]
            });
        }
        
    } catch (error) {
        console.error("Error fetching college details: ", error);
        res.status(500).json({ message: "Failed to retrieve college details" });
    }
};

export default getSpecificCollegeDetailMethod;