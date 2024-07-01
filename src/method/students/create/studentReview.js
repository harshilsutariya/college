import uuid4 from 'uuid4';
import studentreviewModel from '../../../model/student/studentReview.js'
import collegeDetailModel from '../../../model/collegeDetail/collegeDetail.js';
import studentReview from '../../../model/student/studentReview.js';

const studentReviewDetailCreateMethod = async (req, res) => {
    try {
        const collegeId = req.body.collegeId;
        const studentId = req.body.studentId;
        const reviewStar = req.body.reviewStar;
        const text = req.body.text;

        if (collegeId == null || studentId == null || reviewStar == null || text == null) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const college = await collegeDetailModel.findOne({ collegeId, isDeleted: { $ne: true } });
        if (!college) {
            return res.status(404).send({ error: "College is not available. Enter correct collegeId." });
        }
        const studentexist = await studentReview.findOne({ studentId,collegeId,isDeleted: { $ne: true } });
        if (!studentexist) {
            const reviewId = uuid4();
            const newstudentReview = new studentreviewModel({
                studentId,
                collegeId,
                reviewId,
                reviewStar: parseFloat(reviewStar),
                text
            });
    
            if (!newstudentReview) {
                return res.status(400).json({
                    error: 'something went wrong'
                });
            }
    
            const studentReviewData = await newstudentReview.save();
    
            if (studentReviewData) {
    
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
                message: "review Add Successfully",
                studentReviewData
            });
        }
else{
    res.status(500).json({ message: "you have already give reviws", });
}
    }
    catch (error) {
        res.status(500).json({ message: "error", error });
        console.log(error);
    }
}

export default studentReviewDetailCreateMethod;