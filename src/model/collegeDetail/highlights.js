import mongoose from "mongoose";

const highlightsSchema = new mongoose.Schema({

    collegeId: {
        type: String
    },

    highlightsId: {
        type: String
    },

    skillDevelopment: {
        status: {
            type: String,
            default: false
        },
        description: {
            type: String
        }
    },

    careerCounselling: {
        status: {
            type: String,
            default: false
        },
        description: {
            type: String
        }
    },

    scholarship: {
        status: {
            type: String,
            default: false
        },
        description: {
            type: String
        }
    },

    safetySecurity: {
        type: String,
        required: true
    },

    createdAt: {
        type: Number,
        default: Date.now(),
    },

    updatedAt: {
        type: Number
    }

});

const highlightsDetailModel = mongoose.model("highlight", highlightsSchema);

export default highlightsDetailModel;