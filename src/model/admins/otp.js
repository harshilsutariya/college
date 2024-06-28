import mongoose from 'mongoose';
import uuid4 from 'uuid4';

const otpSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true
    },

    otp:{
        type: String,
        required: true
    },

    status:{
        type: String,
        enum: {
            values: ['active','expire'],
            message: '{VALUE} is not supported'
        },
        default:'expire'
    },

    createdAt: {
        type: Number,
        default: Date.now(),
    },

    updatedAt: {
        type: Number
    }

});

const otp = mongoose.model('otp', otpSchema);

export default otp;