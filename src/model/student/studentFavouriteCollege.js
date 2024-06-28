import mongoose from 'mongoose';

const studentFavouriteCollegeSchema = new mongoose.Schema({

    collegeId: {
        type: String,
    },

    studentId: {
        type: String
    },

    studentFavouriteCollegeId : {
        type:String
    },

    createdAt: {
        type: Number,
        default: Date.now,
    },

    updatedAt: {
        type: Number,
        
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

});

const  studentFavouriteCollege = mongoose.model(' studentFavouriteCollege', studentFavouriteCollegeSchema);

export default  studentFavouriteCollege;
