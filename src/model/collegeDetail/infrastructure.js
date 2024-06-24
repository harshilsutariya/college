import mongoose from "mongoose";

const infrastructureSchema = new mongoose.Schema({
    infrastructureId: {
        type: String
    },

    collegeId: {
        type: String
    },

    smartClass: {
        type: Boolean,
        default: false
    },
    staffRoom: {
        type: Boolean,
        default: false
    },
    auditorium: {
        type: Boolean,
        default: false
    },
    computerLab: {
        type: Boolean,
        default: false
    },
    hostel: {
        type: Boolean,
        default: false
    },
    bustransport: {
        type: Boolean,
        default: false
    },
    parking: {
        type: Boolean,
        default: false
    },
    cctv: {
        type: Boolean,
        default: false
    },
    library: {
        type: Boolean,
        default: false
    },
    elevator: {
        type: Boolean,
        default: false
    },
    powerBackup: {
        type: Boolean,
        default: false
    },
    canteen: {
        type: Boolean,
        default: false
    },
    medicalSupport: {
        type: Boolean,
        default: false
    },
    fileSafety: {
        type: Boolean,
        default: false
    },
    emergencyExit: {
        type: Boolean,
        default: false
    },
    playGround: {
        type: Boolean,
        default: false
    },
    moreInfo: {
        type: String,
        required: true
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

const infrastructureDetailModel = mongoose.model("infrastructure", infrastructureSchema);

export default infrastructureDetailModel;