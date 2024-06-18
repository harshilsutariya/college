import mongoose from 'mongoose';

const collegeImagesSchema = new mongoose.Schema({

    collgeImagesId: {
        type: String
    },

    collegeId: {
        type: String
    },
    
    imageName: {
        type: String,
        required: true
    },

    Name: {
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

const collegeImages = mongoose.model('collegeImages', collegeImagesSchema);

export default collegeImages;
