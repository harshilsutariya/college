import uuid4 from 'uuid4';
import StudentCollegeApplication from '../../../model/student/studentCollegeApplication.js';
import { emailRegex, phoneRegex } from '../../../utility/utils.js';
import { fileUrl } from '../../../utility/fileServerConfig.js';
import collegeDetailModel from '../../../model/collegeDetail/collegeDetail.js';
import subjectDetailModel from '../../../model/collegeDetail/subjects.js';

const studentApplicationCreateMethod = async (req, res) => {
    try {
        const collegeId = req.body.collegeId;
        const subjectId = req.body.subjectId;
        const studentId = req.body.studentId;
        const name = req.body.name;
        const surname = req.body.surname;
        const selectSubject = req.body.selectSubject;
        const nationality = req.body.nationality;
        const motherTongue = req.body.motherTongue;
        const gender = req.body.gender;
        const dob = req.body.dob;
        const bloodGroup = req.body.bloodGroup;
        const studentCity = req.body.studentCity;
        const district = req.body.district;
        const studentState = req.body.studentState;
        const religion = req.body.religion;
        const casteName = req.body.casteName;
        const subCasteName = req.body.subCasteName;
        const casteCategory = req.body.casteCategory;
        const reservation = req.body.reservation;
        const examinationPassed = req.body.examinationPassed;
        const schoolLastStudied = req.body.schoolLastStudied;
        const examYear = req.body.examYear;
        const groupApplied = req.body.groupApplied;
        const secondLanguage = req.body.secondLanguage;
        const hallTicketNo = req.body.hallTicketNo;
        const aadharNo = req.body.aadharNo;
        const nameOfFather = req.body.nameOfFather;
        const occupation = req.body.occupation;
        const annualIncome = req.body.annualIncome;
        const addressResidence = req.body.addressResidence;
        const addressPermanent = req.body.addressPermanent;
        const parentCity = req.body.parentCity;
        const parentState = req.body.parentState;
        const phone = req.body.phone;
        const email = req.body.email;
        const note = req.body.note;

        if (collegeId == null || subjectId == null || studentId == null || name == null || surname == null ||
            selectSubject == null || nationality == null || motherTongue == null || gender == null ||
            dob == null || bloodGroup == null || studentState == null || district == null || studentCity == null ||
            religion == null || casteName == null || subCasteName == null || casteCategory == null ||
            reservation == null || examinationPassed == null || schoolLastStudied == null || examYear == null ||
            groupApplied == null || secondLanguage == null || hallTicketNo == null || aadharNo == null || nameOfFather == null || occupation == null ||
            annualIncome == null || addressResidence == null || parentCity == null || parentState == null ||
            addressPermanent == null || phone == null || email == null || note == null) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const college = await collegeDetailModel.findOne({ collegeId, isDeleted: { $ne: true } });
        if (!college) {
            return res.status(404).send({ error: "College is not available. Enter correct collegeId." });
        }

        const subject = await subjectDetailModel.findOne({ subjectId, isDeleted: { $ne: true } });
        if (!subject) {
            return res.status(404).send({ error: "subject is not available. Enter correct collegeId." });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        const studentDetail = {
            name,
            surname,
            selectSubject,
            nationality,
            motherTongue,
            gender,
            dob,
            bloodGroup,
            studentCity,
            district,
            studentState,
            religion,
            casteName,
            subCasteName,
            casteCategory,
            reservation,
            examinationPassed,
            schoolLastStudied,
            examYear,
            groupApplied,
            secondLanguage,
            hallTicketNo,
            aadharNo
        };

        const parentDetail = {
            nameOfFather,
            occupation,
            annualIncome,
            addressResidence,
            parentCity,
            parentState,
            addressPermanent,
            phone,
            email
        };

        const upload_documents = {};
        for (const field in req.files) {
            if (req.files[field]) {
                upload_documents[field] = `${fileUrl}/student/apply/image/${req.files[field][0].filename}`;
            }
        }

        // Check for previous applications
        const previousApplications = await StudentCollegeApplication.find({ collegeId, subjectId, studentId });
        if (previousApplications.length > 0 ) {
            for (const application of previousApplications) {
                if (application.Status === "pending" || application.Status === "accepted") {
                    return res.status(403).json({
                        message: `For this course, your previous application is already in ${application.Status} mode.`,
                    });
                }
            }
        }

        const studentApplyId = uuid4();
        const newstudentApply = new StudentCollegeApplication({
            studentId, collegeId, subjectId, studentApplyId,
            studentDetail, parentDetail, uploadDocument: upload_documents, note
        });

        if (!newstudentApply) {
            return res.status(400).json({
                error: 'something went wrong'
            });
        }
        const studentapplicationData = await newstudentApply.save();

        if(studentapplicationData){
            await collegeDetailModel.updateOne(
                { collegeId: collegeId },
                { $inc: { appliedAdmission: 1 } }
            ); 
        }

        res.status(201).json({
            message: "student Detail Add Successfully",
            studentapplicationData
        });
    }

    catch (error) {
        res.status(500).json({ message: "error", error });
        console.log(error);
    }
}

export default studentApplicationCreateMethod;