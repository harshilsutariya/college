import mongoose from "mongoose";

const eligibilityAndTermsSchema = new mongoose.Schema({
    eligibilityAndTermsId: {
        type: String
    },

    collegeId: {
        type: String
    },

    eligibilityCrieria: {
        type: String,
        default: false
    },

    feeTerms: {
        type: String,
        default: false
    },
    
    createdAt: {
        type: Number,
        default: Date.now(),
    },

    updatedAt: {
        type: Number
    }
});

const eligibilityAndTermsDetailModel = mongoose.model("eligibilityAndTerms", eligibilityAndTermsSchema);

export default eligibilityAndTermsDetailModel;