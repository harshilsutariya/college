import uuid4 from 'uuid4';
import infrastructureDetailModel from "../../../model/collegeDetail/infrastructure.js";
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";

const infrastructureUpdateMethod = async (req, res) => {
    try {
        const infrastructureId = req.body.infrastructureId;
        const collegeId = req.body.collegeId;
        const smartClass = req.body.smartClass;
        const staffRoom = req.body.staffRoom;
        const auditorium = req.body.auditorium;
        const computerLab = req.body.computerLab;
        const hostel = req.body.hostel;
        const busTransport = req.body.busTransport;
        const parking = req.body.parking;
        const cctv = req.body.cctv;
        const library = req.body.library;
        const elevator = req.body.elevator;
        const powerBackup = req.body.powerBackup;
        const canteen = req.body.canteen;
        const medicalSupport = req.body.medicalSupport;
        const fileSafety = req.body.fileSafety;
        const emergencyExit = req.body.emergencyExit;
        const playGround = req.body.playGround;
        const moreInfo = req.body.moreInfo;        

        const collegeExists = await collegeModel.findOne({ collegeId, isDeleted: { $ne: true } });
        if (!collegeExists) {
            return res.status(404).json({ error: 'College ID does not exist' });
        }

        const existingInfrastructure = await infrastructureDetailModel.findOne({ infrastructureId  ,isDeleted: { $ne: true }});
        if (!existingInfrastructure) {
            return res.status(404).json({ error: 'Infrastructure details not found for update' });
        }

        const updateData = {
            smartClass,
            staffRoom,
            auditorium,
            computerLab,
            hostel,
            busTransport,
            parking,
            cctv,
            library,
            elevator,
            powerBackup,
            canteen,
            medicalSupport,
            fileSafety,
            emergencyExit,
            playGround,
            moreInfo
        };

        const infrastructureUpdateResult = await infrastructureDetailModel.updateOne(
            { infrastructureId },
            { $set: updateData }
        );

        res.status(200).json({
            message: "Infrastructure details updated successfully",
            infrastructureUpdateResult
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Error updating infrastructure details", error: error.message });
    }
};

export default infrastructureUpdateMethod;
