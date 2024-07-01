import collegeTeam from '../../../model/admins/collegeAdmins.js';
import students from '../../../model/student/studentRegistration.js';
import { sendEmail } from '../../../Services/nodemailer.js';
import otpModel from '../../../model/admins/otp.js';

export const otpMethod = async (req, res) => {
    try {
        const email = req.body.email;

        const admin = await collegeTeam.findOne({ email });
        const student = await students.findOne({ email });

        if (!admin && !student) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const emailexist = await otpModel.findOne({ email });

        if (emailexist) {
            await otpModel.updateOne(
                { email: email },
                { $set: { otp: otp, status: 'active', updatedAt: Date.now() } }
            );
        } else {
            const otpEntry = new otpModel({
                email,
                otp,
                status: 'active',
                createdAt: Date.now(),
                updatedAt: Date.now()
            });

            await otpEntry.save();
        }

        const subject = 'Your OTP for Secure Access';
        const text = `Dear User,

We have received a request to reset the password for your account associated with this email address. Please use the following One-Time Password (OTP) to proceed with the password reset process.

Your OTP is: ${otp}

This OTP is valid for a limited time and can only be used once. If you did not request this change, please disregard this email and ensure your account's security by changing your password immediately.

Best regards,
Your Support Team`;

        await sendEmail(email, subject, text);

        res.status(200).json({ message: 'OTP sent successfully', otp });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
        console.log(error);
    }
};

export default otpMethod;
