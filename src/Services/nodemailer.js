import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'harshilsutariya52@gmail.com',
        pass: 'xgae lrae ifkm rvyi'
    },
    secure: false
});


export const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: 'harshilsutariya52@gmail.com',
            to: to,
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) { 
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
};

export default sendEmail;