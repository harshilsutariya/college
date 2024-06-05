import mongoose from 'mongoose';

const sportSchema = new mongoose.Schema({

    sportsId: {
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
    }

});

const Sport = mongoose.model('Sport', sportSchema);

export default Sport;
