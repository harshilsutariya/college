import bcrypt from 'bcrypt';
import { emailRegex } from '../../../utility/utils.js';
import collegeTeam from '../../../model/admins/collegeAdmins.js';

const createCollegeTeamMethod = async (req, res) => {
    try {
        
        if (!(req.role === 'superadmin' || req.role === 'collegeAdmin' || req.role === 'supermoderator')) {
            return res.status(403).send({
                status: "failed",
                error: "You don't have access"
            });
        }

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        const collegeId = req.body.collegeId;

        // Check if all required fields are present
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if email already exists in the database
        const existingUser = await collegeTeam.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists!' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new college login entry
        const newCollegeUser = new collegeTeam({
            collegeId,
            name,
            email,
            password: hashedPassword,
            role,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        // Save the new entry to the database
        await newCollegeUser.save();

        // Respond with the created entry
        res.status(201).json({ message: 'User created successfully', collegeUser: newCollegeUser });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

export default createCollegeTeamMethod;
