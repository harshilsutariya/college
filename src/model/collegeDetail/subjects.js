import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({

    collegeId: {    
        type: String
    },

    subjectId: {
        type: String
    },

    subjectName: {
        type: String,
        enum: {
            values: ['maths', 'physics', 'chemistry','computer','english'],
            message: '{VALUE} is not supported'
        },
        required : true
    },

    description: {
        type:String
    },

    minimumFees: {
        type:Number
    },

    maximumFees: {
        type:Number
    },

    noOfSeats: {
        type:Number
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

const subjectDetailModel = mongoose.model("subjects", subjectSchema);

export default subjectDetailModel;