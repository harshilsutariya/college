import { v4 as uuid4 } from 'uuid';
import studentreviewModel from '../../../model/student/studentReview.js';
import collegeDetailModel from '../../../model/collegeDetail/collegeDetail.js';

const studentReviewDetailUpdateMethod = async (req, res) => {
    try {

        const collegeId = req.body.collegeId;
        const reviewId = req.body.reviewId;
        const studentId = req.body.studentId;
        const reviewStar = req.body.reviewStar;
        const text = req.body.text;

        if (!collegeId || !studentId || reviewStar == null || !text) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const college = await collegeDetailModel.findOne({ collegeId, isDeleted: { $ne: true } });
        if (!college) {
            return res.status(404).send({ error: "College is not available. Enter correct collegeId." });
        }

        const newstudentReview = {
            isUpdated: true,
            reviewId,
            studentId,
            collegeId,
            reviewId,
            reviewStar: parseFloat(reviewStar),
            text
        };

        const studentReviwUpdateData = await studentreviewModel.updateOne(
            { reviewId },
            { $set: newstudentReview }
        );

        if (studentReviwUpdateData) {

            const studentReviews = await studentreviewModel.find({ collegeId, isDeleted: { $ne: true } });

            const totalReviewStars = studentReviews.reduce((sum, review) => sum + parseFloat(review.reviewStar), 0);
            const newReviewCount = studentReviews.length;
            const newAverageReview = totalReviewStars / newReviewCount;

            await collegeDetailModel.updateOne(
                { collegeId: collegeId },
                { $set: { review: newAverageReview } }
            );
        }

        res.status(201).json({
            message: "Review added successfully",
            studentReviwUpdateData
        });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
        console.error(error);
    }
};

export default studentReviewDetailUpdateMethod;
