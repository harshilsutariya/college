    import mongoose from 'mongoose';
    import { uuid } from 'uuidv4';

    const studentSchema = new mongoose.Schema({

        name: {
            type: String,
            required: true
        },

        studentId:{
            type: String
        },

        gender: {
            type: String,
            enum: {
                values: ['male', 'female'],
                message: '{VALUE} is not supported'
            },
        },

        schoolName: {
            type: String,
            required: true
        },

        role: {
            type: String,
            default: 'student'
        },

        password: {
            type: String,
            required: true
        },

        mobile: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        createdAt: {
            type: Number,
            default: Date.now,
        },

        updatedAt: {
            type: Number,
            default: Date.now
        },

        isDeleted: {
            type: Boolean,
            default: false
        }

    });

    const students = mongoose.model('students', studentSchema);

    export default students;
