import mongoose from 'mongoose';

const academicsSchema = new mongoose.Schema({

    academicsId: {
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
        type : Boolean,
        default : false
    }

});

const academics = mongoose.model('academics', academicsSchema);

export default academics;
