import mongoose from "mongoose";

const managementAndStaffSchema = new mongoose.Schema({

    collegeId: {    
        type: String
    },

    managementAndStaffId: {    
        type: String
    },

    profilePicture: {
        type: String,
        required: true
    },
    
    localServerUrl: {
        type: String,
        required: true
    },
    
    Name: {
        type: String
    },

    qualification: {
        type: String
    },

    experience:[{
        total: {
            type: Number,
            enum: {
                values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                required: true
            }
        },
        current: {
            type: Number,
            enum: {
                values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                required: true
            }
        },
    }],

    designation: {
        type: String
    },

    c: {
        type: String
    },

    createdAt: {
        type: Number,
        default: Date.now(),
    },

    updatedAt: {
        type: Number
    }

});

const managementAndStaffDetailModel = mongoose.model("managementAndStaff", managementAndStaffSchema);

export default managementAndStaffDetailModel;