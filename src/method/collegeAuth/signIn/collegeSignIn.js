import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import collegeTeam from '../../../model/admins/collegeAdmins.js';

export const collegeSignInMethod = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const admin = await collegeTeam.findOne({ email });
        if (!admin) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }
        const role = admin.role;
        const token = jwt.sign({ collegeTeamId: admin.collegeTeamId ,role: role ,collegId:admin.collegeId }, 'harshil@52', { expiresIn: '1h' });

        console.log('Token:', token);
        console.log('Passwords match! User authenticated.');

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); 

        return res.status(200).json({ token, message: 'User login successfully' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

export default collegeSignInMethod;