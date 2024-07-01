import collegeTeam from '../../../model/admins/collegeAdmins.js';
import students from '../../../model/student/studentRegistration.js';
import otpModel from '../../../model/admins/otp.js';
import bcrypt from 'bcrypt';

export const otpVerifyMethod = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        if (!email || !otp || !newPassword || !confirmPassword) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const admin = await collegeTeam.findOne({ email });
        const student = await students.findOne({ email });

        if (!admin && !student) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const otpEntry = await otpModel.findOne({ email, otp });

        if (!otpEntry) {
            return res.status(400).json({ error: 'OTP Invalid ' });
        }

        if (otpEntry.status == "expire") {
            return res.status(400).json({ error: 'OTP Invalid or Expired' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        if (admin) {
            admin.password = hashedPassword;
            await admin.save();
        } else if (student) {
            student.password = hashedPassword;
            await student.save();
        }

        otpEntry.status = 'expire';
        otpEntry.updatedAt = Date.now();
        await otpEntry.save();

        res.status(200).json({ message: 'Verification successful' });

    } catch (error) {
        console.error('Error in otpverifyMethod:', error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

export default otpVerifyMethod;
