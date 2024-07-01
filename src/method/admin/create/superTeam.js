import bcrypt from 'bcrypt';
import { emailRegex } from '../../../utility/utils.js';
import superTeam from '../../../model/admins/superAdmin.js';
import uuid4 from 'uuid4';

const createSuperTeamMethod = async (req, res) => {
    try {
        
        // if (!(req.role === 'superadmin')) {
        //     return res.status(403).send({
        //         status: "failed",
        //         error: "You don't have access"
        //     });
        // }

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const employeeId = req.body.employeeId;
        const role = req.body.role;

        // Check if all required fields are present
        if (!name || !email || !password || !role || !employeeId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if email already exists in the database
        const existingAdmin = await superTeam.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Email already exists!' });
        }

        const existingemployee = await superTeam.findOne({ employeeId });
        if (existingemployee) {
            return res.status(400).json({ error: 'employeeId already exists!' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new college login entry
        const newSuperUser = new superTeam({
            superAdminId: uuid4(),
            name,
            email,
            employeeId,
            password: hashedPassword,
            role,
            createdAt: Date.now()
        });

        // Save the new entry to the database
        await newSuperUser.save();

        // Respond with the created entry
        res.status(201).json({ message: 'admin created successfully',  newSuperUser });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

export default createSuperTeamMethod;
