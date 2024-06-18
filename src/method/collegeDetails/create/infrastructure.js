import uuid4 from 'uuid4';
import infrastructureDetailModel from "../../../model/collegeDetail/infrastructure.js";
import collegeModel from "../../../model/collegeDetail/collegeDetail.js";

const infrastructureCreateMethod = async (req, res) => {
    try {
        const collegeId = req.body.collegeId
        const smartClass = req.body.smartClass;
        const staffRoom = req.body.staffRoom;
        const auditorium = req.body.auditorium;
        const computerLab = req.body.computerLab;
        const hostel = req.body.hostel;
        const bustransport = req.body.busTransport;
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

        const collegeExists = await collegeModel.find({ collegeId: collegeId });
        if (collegeExists == 0) {
            return res.status(400).json({ error: 'College ID does not exist' });
        }

        const infrastructureExists = await infrastructureDetailModel.find({ collegeId: collegeId });
        if (infrastructureExists) {
            return res.status(400).json({ error: 'infrastructure is already add for this college' });
        }

        const infrastructureDetail = new infrastructureDetailModel({
            infrastructureId: uuid4(),
            collegeId, smartClass, staffRoom, auditorium, computerLab, hostel,
            bustransport, parking, cctv, library, elevator, powerBackup,
            canteen, medicalSupport, fileSafety, emergencyExit, playGround,
            moreInfo
        });

        const infrastructureData = await infrastructureDetail.save();
        res.status(201).json({
            message: "infrastructure Detail Add Successfully",
            infrastructureData
        });

    }
    catch (error) {
        res.status(500).json({ message: "error", error });
    }

}
export default infrastructureCreateMethod;  