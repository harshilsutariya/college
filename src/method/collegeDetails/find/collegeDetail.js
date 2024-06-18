import academics from "../../../model/collegeDetail/academics.js";
import alumniAndtoppers from "../../../model/collegeDetail/alumniAndToppers.js";
import collegeDetailModel from "../../../model/collegeDetail/collegeDetail.js";
import collegeImages from "../../../model/collegeDetail/collegeImages.js";
import collegePolicyAndSocialMediaDetailModel from "../../../model/collegeDetail/collegePolicyAndSocialMedia.js";
import cultural from "../../../model/collegeDetail/cultural.js";
import eligibilityAndTermsDetailModel from "../../../model/collegeDetail/eligibilityAndTerms.js";
import highlightsDetailModel from "../../../model/collegeDetail/highlights.js";
import infrastructureDetailModel from "../../../model/collegeDetail/infrastructure.js";
import managementAndStaffDetailModel from "../../../model/collegeDetail/managementAndStaff.js";
import Sport from "../../../model/collegeDetail/sports.js";
import subjectDetailModel from "../../../model/collegeDetail/subjects.js";
import youTubeLinkDetailModel from "../../../model/collegeDetail/youTubeLink.js";

export const getAllCollegeDetails = async (req, res) => {
    try {
        const results = await Promise.all([
            collegeDetailModel.find(),
            infrastructureDetailModel.find(),
            academics.find(),
            alumniAndtoppers.find(),
            collegeImages.find(),
            collegePolicyAndSocialMediaDetailModel.find(),
            cultural.find(),
            eligibilityAndTermsDetailModel.find(),
            highlightsDetailModel.find(),
            managementAndStaffDetailModel.find(),
            Sport.find(),
            subjectDetailModel.find(),
            youTubeLinkDetailModel.find()
        ]);

        // Initialize an object to group data by collegeId
        const groupedData = {};

        // Function to group data
        const groupByCollegeId = (data, key) => {
            data.forEach(item => {
                const collegeId = item.collegeId;
                if (!groupedData[collegeId]) {
                    groupedData[collegeId] = {
                        collegeDetails: [],
                        infrastructure: [],
                        academics: [],
                        alumniAndToppers: [],
                        images: [],
                        policyAndSocialMedia: [],
                        culturalDetails: [],
                        eligibilityAndTerms: [],
                        highlights: [],
                        managementAndStaff: [],
                        sports: [],
                        subjects: [],
                        youtubeLinks: []
                    };
                }
                groupedData[collegeId][key].push(item);
            });
        };

        // Group data by collegeId
        groupByCollegeId(results[0], 'collegeDetails');
        groupByCollegeId(results[1], 'infrastructure');
        groupByCollegeId(results[2], 'academics');
        groupByCollegeId(results[3], 'alumniAndToppers');
        groupByCollegeId(results[4], 'images');
        groupByCollegeId(results[5], 'policyAndSocialMedia');
        groupByCollegeId(results[6], 'culturalDetails');
        groupByCollegeId(results[7], 'eligibilityAndTerms');
        groupByCollegeId(results[8], 'highlights');
        groupByCollegeId(results[9], 'managementAndStaff');
        groupByCollegeId(results[10], 'sports');
        groupByCollegeId(results[11], 'subjects');
        groupByCollegeId(results[12], 'youtubeLinks');

        res.json(groupedData);
    } catch (error) {
        console.error("Error fetching college details: ", error);
        res.status(500).json({ message: "Failed to retrieve college details" });
    }
};

export default getAllCollegeDetails;
