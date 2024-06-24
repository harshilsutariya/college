import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({

    collegeId: {
        type: String,
    },

    collegeName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    area: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    collegeType: {
        type: String,
        enum: {
            values: ['private', 'government'],
            message: '{VALUE} is not supported'
        },
    },

    systemType: {
        type: String,
        enum: {
            values: ['co-ed', 'regular'],
            message: '{VALUE} is not supported'
        }
    },

    academicType: {
        type: String,
        enum: {
            values: ['day college', 'weekend college', 'night college'],
            message: '{VALUE} is not supported'
        }
    },

    affiliated: {
        type: String,
        enum: {
            values: ['stateboard', 'nationalboard', 'university'],
            message: '{VALUE} is not supported'
        }
    },

    classRooms: {
        type: Number,
        required: true,
    },

    totalSeats: {
        type: Number,
        required: true,
    },

    classType: {
        type: String,
        enum: {
            values: ['ac', 'non-ac'],
            message: '{VALUE} is not supported'
        }
    },

    collegeCode: {
        type: Number,
        required: true,
    },

    collegeArea: {
        type: Number,
        required: true,
    },

    noOfFloors: {
        type: Number,
        required: true,
    },

    timings: [{
        open: {
            type: String,
            enum: {
                values: ['7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 am']
            }
        },
        close: {
            type: String,
            enum: {
                values: ['1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm']
            }
        },
        monToSat: {
            type: String,
            enum: {
                values: ['mon to sat', 'mon to fri']
            }
        },
    }],

    historyAndAchievement: {
        type: String,
        required: true,
    },

    discriptionBox: {
        type: String,
        required: true,
    },

    moreInfo: {
        type: String,
        required: true,
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

const collegeDetailModel = mongoose.model("college", collegeSchema);

export default collegeDetailModel;