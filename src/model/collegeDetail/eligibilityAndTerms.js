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
    },

    feeTerms: {
        type: String,
        require: true,
    },
    
    createdAt: {
        type: Number,
        default: Date.now(),
    },

    updatedAt: {
        type: Number
    },
    
    isDeleted : {
        type : Boolean,
        default : false
    }
});

const eligibilityAndTermsDetailModel = mongoose.model("eligibilityAndTerms", eligibilityAndTermsSchema);

export default eligibilityAndTermsDetailModel;