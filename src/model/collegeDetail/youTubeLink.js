import mongoose from "mongoose";

const youTubeLinkSchema = new mongoose.Schema({

    collegeId: {
        type: String
    },

    youTubeLinkId: {
        type: String
    },

    youTubeLink1: {
        type: String
    },

    youTubeLink2: {
        type: String
    },

    youTubeLink3: {
        type: String
    },

    youTubeLink4: {
        type: String
    },

    youTubeLink5: {
        type: String
    },

    createdAt: {
        type: Number,
        default: Date.now(),
    },

    updatedAt: {
        type: Number
    },
    
    isDeleted : {
        type : String,
        default : false
    }
});

const youTubeLinkDetailModel = mongoose.model("youTube", youTubeLinkSchema);

export default youTubeLinkDetailModel;