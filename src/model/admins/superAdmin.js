import mongoose from 'mongoose';

const superTeamSchema = new mongoose.Schema({

    superAdminId: {
        type: String
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    employeeId: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        enum: {
            values: ['superAdmin', 'superModerator', 'superViewer'],
            message: '{VALUE} is not supported',
        },
        required: true
    },

    isDeleted: {
        type: String,
        default: false
    },

    createdAt: {
        type: Number,
        default: Date.now(),
    },

});

const superTeam = mongoose.model('superTeam', superTeamSchema);

export default superTeam;