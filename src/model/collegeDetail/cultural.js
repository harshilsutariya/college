import mongoose from 'mongoose';

const culturalSchema = new mongoose.Schema({

    culturalId: {
        type: String
    },

    collegeId: {
        type: String
    },
    
    imageName: {
        type: String,
        required: true
    },

    moreInfo: {
        type: String,
        required: true
    },

    localServerUrl: {
        type: String,
        required: true
    },

    firebaseUrl: {
        type: String,
        default: null
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

const cultural = mongoose.model('cultural', culturalSchema);

export default cultural;
