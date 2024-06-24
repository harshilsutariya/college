import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import studentmodel from '../../../model/student/studentRegistration.js'

export const studentSignInMethod = async (req, res) => {
    try {

        const mobile = req.body.mobile;
        const password = req.body.password;

        const student = await studentmodel.findOne({ mobile });
        if (!student) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }
        const role = student.role;
        const name = student.name;
        const token = jwt.sign({ studentId: student.studentId ,role: role, name:name}, 'harshil@52', { expiresIn: '1h' });

        console.log('Token:', token);
        console.log('Passwords match! User authenticated.');

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); 

        return res.status(200).json({ token, message: 'User login successfully' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

export default studentSignInMethod;