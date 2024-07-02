import mongoose from 'mongoose';

const StudentCollegeApplicationSchema = new mongoose.Schema({

    studentId: {
        type: String,
    },

    collegeId: {
        type: String,
    },

    subjectId: {
        type: String,
    },

    studentApplyId: {
        type: String,
    },

    Status: {
        type: String,
        enum: {
            values: ['accept', 'pending','rejected'],
            message: '{VALUE} is not supported'
        },
        default:'pending'
    },

    studentDetail:{

        name: {
            type: String,
            required: true
        },
    
        surname: {
            type: String,
            required: true
        },
    
        selectSubject: {
            type: String,
            required: true
        },

        nationality: {
            type: String,
            required: true
        },
    
        motherTongue: {
            type: String,
            required: true
        },
    
        gender: {
            type: String,
            enum: {
                values: ['male', 'female'],
                message: '{VALUE} is not supported'
            },
        },
    
        dob: {
            type: Date,
            required: true
        },
    
        bloodGroup: {
            type: String,
            required: true
        },
    
        studentCity: {
            type: String,
            required: true
        },
    
        district: {
            type: String,
            required: true
        },
    
        studentState: {
            type: String,
            required: true
        },
    
        religion: {
            type: String,
            required: true
        },
        casteName: {
            type: String,
            required: true
        },
    
        subCasteName: {
            type: String,
            required: true
        },
    
        casteCategory: {
            type: String,
            required: true
        },
    
        reservation: {
            type: String,
            required: true
        },
    
        examinationPassed: {
            type: String,
            required: true
        },
    
        schoolLastStudied: {
            type: String,
            required: true
        },
    
        examYear: {
            type: Number,
            required: true
        },
    
        groupApplied: {
            type: String,
            required: true
        },
    
        secondLanguage: {
            type: String,
            required: true
        },
    
        hallTicketNo: {
            type: String,
            required: true
        },
    
        aadharNo: {
            type: String,
            required: true
        }
    },


   
    parentDetail: {

        nameOfFather: {
            type: String,
            required: true
        },
    
        occupation: {
            type: String,
            required: true
        },
    
        annualIncome: {
            type: Number,
            required: true
        },
    
        addressResidence: {
            type: String,
            required: true
        },
    
        addressPermanent: {
            type: String,
            required: true
        },

        parentCity: {
            type: String,
            required: true
        },
    
        parentState: {
            type: String,
            required: true
        },
        
        phone: {
            type: Number,
            required: true
        },
    
        email: {
            type: String,
            required: true
        }

    },


    uploadDocument: {

        photoUrl: {
            type: String,
            required: true
        },
    
        hallTicketUrl: {
            type: String,
            required: true
        },
    
        aadharCardUrl: {
            type: String,
            required: true
        },
    
        casteCertificateUrl: {
            type: String,
            required: true
        }

    },

    note: {
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

const StudentCollegeApplication = mongoose.model('StudentCollegeApplication', StudentCollegeApplicationSchema);

export default StudentCollegeApplication;
