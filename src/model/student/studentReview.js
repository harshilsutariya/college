import mongoose from 'mongoose';

const studentReviewSchema = new mongoose.Schema({

    collegeId: {
        type: String,
    },

    studentId: {
        type: String
    },

    reviewId: {
        type: String,
    },

    reviewStar: {
        type: Number,
        default: 0
    },

    text: {
        type: String,
    },

    isUpdated: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Number,
        default: Date.now,
    },

    updatedAt: {
        type: Number,
        default: Date.now
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

});

const  studentReview = mongoose.model(' studentReview', studentReviewSchema);

export default  studentReview;
