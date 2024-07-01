import mongoose from 'mongoose';
import uuid4 from 'uuid4';

const collegeTeamSchema = new mongoose.Schema({

    collegeId:{
        type:String
    },

    collegeTeamId:{
        type:String,
        default:uuid4
    },

    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    role:{
        type: String,
        enum: {
            values: ['superadmin','collegeAdmin', 'collegeViewer', 'collegeModerator'],
            message: '{VALUE} is not supported',
        },
        default:'collegeAdmin',
        required : true
    },

    isDeleted : {
        type : String,
        default : false
    },

    createdAt: {
        type: Number,
        default: Date.now(),
    },

    updatedAt: {
        type: Number
    }

});

const collegeTeam = mongoose.model('collegeTeam', collegeTeamSchema);

export default collegeTeam;