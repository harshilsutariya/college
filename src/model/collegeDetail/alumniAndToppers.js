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

    moreInfo:{
        type: String,
        required: true
    },

    passingOutYear:{
        type: String,
        required: true
    },

    marks:{
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

    isDeleted : {
        type : String,
        default : false
    },

    updatedAt: {
        type: Number
    }

});

const alumniAndtoppers = mongoose.model('alumniAndtoppers', alumniAndtoppersSchema);

export default alumniAndtoppers;
