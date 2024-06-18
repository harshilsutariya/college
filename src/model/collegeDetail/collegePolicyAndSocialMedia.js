import mongoose from "mongoose";

const collegePolicyAndSocialMediaSchema = new mongoose.Schema({

    collegeId: {
        type: String
    },

    collegePolicyAndSocialMedialId: {
        type: String
    },

    termsAndconditions:{
        type:String
    },
    
    website:{
        type:String
    },

    facebook:{
        type:String
    },

    youtube:{
        type:String
    },

    instagram:{
        type:String
    },

    createdAt: {
        type: Number,
        default: Date.now(),
    },

    updatedAt: {
        type: Number
    }

});

const collegePolicyAndSocialMediaDetailModel = mongoose.model("collegePolicyAndSocialMedia", collegePolicyAndSocialMediaSchema);

export default collegePolicyAndSocialMediaDetailModel;