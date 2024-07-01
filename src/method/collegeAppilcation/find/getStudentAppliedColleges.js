import studentDetailModel from '../../../model/student/studentRegistration.js';
import StudentCollegeApplication from '../../../model/student/studentCollegeApplication.js';
import studentReview from '../../../model/student/studentReview.js';
import collegeDetailModel from '../../../model/collegeDetail/collegeDetail.js';

const getStudentAppliedCollegeCreateMethod = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        // Fetch student details
        const student = await studentDetailModel.findOne({ studentId, isDeleted: { $ne: true } });
        if (!student) {
            return res.status(404).send({ error: "Student is not available. Enter correct studentId." });
        }

        // Fetch student college applications
        const studentCollegeApplications = await StudentCollegeApplication.find({ studentId, isDeleted: { $ne: true } });

        // Fetch student reviews
        const studentReviews = await studentReview.find({ studentId, isDeleted: { $ne: true } });

        // Fetch all colleges related to the student applications and reviews
        const applicationCollegeIds = studentCollegeApplications.map(app => app.collegeId);
        const reviewCollegeIds = studentReviews.map(review => review.collegeId);
        const collegeIds = [...new Set([...applicationCollegeIds, ...reviewCollegeIds])]; // Remove duplicates

        const colleges = await collegeDetailModel.find({ collegeId: { $in: collegeIds }, isDeleted: { $ne: true } });

        // Create a map of collegeId to collegeName for quick lookup
        const collegeIdToNameMap = {};
        colleges.forEach(college => {
            collegeIdToNameMap[college.collegeId] = college.collegeName;
        });

        // Prepare the result
        const result = {
            appliedColleges: studentCollegeApplications.map(app => ({
                collegeName: collegeIdToNameMap[app.collegeId] || "Unknown College"
            })),
            reviews: studentReviews.map(review => ({
                reviewStar: review.reviewStar,
                collegeName: collegeIdToNameMap[review.collegeId],
                text: review.text 
            }))
        };

        // Send the response
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching student details: ", error);
        res.status(500).json({ message: "Failed to retrieve student details", error });
    }
};

export default getStudentAppliedCollegeCreateMethod;
