import mongoose from 'mongoose';

const alumniAndtoppersSchema = new mongoose.Schema({

    alumniAndtoppersId: {
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

const alumniAndtoppers = mongoose.model('alumniAndtoppers', alumniAndtoppersSchema);

export default alumniAndtoppers;
