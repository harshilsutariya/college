import uuid4 from 'uuid4';
import bcrypt from 'bcrypt';
import studentDetailModel from '../../../model/student/studentRegistration.js';
import { emailRegex, phoneRegex } from '../../../utility/utils.js';

const studentDetailCreateMethod = async (req, res) => {
    try {
        const name = req.body.name;
        const gender = req.body.gender;
        const schoolName = req.body.schoolName;
        const password = req.body.password;
        const mobile = req.body.mobile;
        const email = req.body.email;
        const confirmPassword = req.body.confirmPassword;

        if (name == null || gender == null || schoolName == null || password == null ||
            mobile == null || email == null) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password!==confirmPassword){
            return res.status(400).json({ error: 'password and confirmPassword is not mathced' })
        }
        
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (!phoneRegex.test(mobile)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        const existingCollegeWithEmail = await studentDetailModel.findOne({ email });
        const existingCollegeWithPhone = await studentDetailModel.findOne({ mobile });

        if (existingCollegeWithEmail || existingCollegeWithPhone) {
            return res.status(400).json({
                error: 'Email or phone number already exists'
            });
        }
        else {
            const studentId = uuid4();
            const hashedPassword = await bcrypt.hash(password, 10);
            const newstudent = new studentDetailModel({
                studentId,
                name, email, password: hashedPassword, mobile, gender, schoolName
            });

            if (!newstudent) {
                return res.status(400).json({
                    error: 'something went wrong'
                });
            }

            const studentData = await newstudent.save();

            res.status(201).json({
                message: "student Detail Add Successfully",
                studentData
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "error", error });
        console.log(error);
    }
}

export default studentDetailCreateMethod;