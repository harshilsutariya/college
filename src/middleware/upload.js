import multer from 'multer';
import { fileURLToPath } from "url";
import uuid4 from 'uuid4';
import { uuid } from 'uuidv4';

// Function to configure multer storage with dynamic destination
const configureStorage = (assetsDirectory) => {

    return multer.diskStorage({
        destination: (req, file, cb) => {
            // Define your destination directory
            cb(null, assetsDirectory);
        },
        filename: (req, file, cb) => {
            // Define filename logic (e.g., keep original filename)
            cb(null, file.originalname);
        }
    });
};

// Function to create multer upload middleware with dynamic storage
export const uploadMW = (assetsDirectory) => {
    const storage = configureStorage(assetsDirectory);
    return multer({
        storage: storage
    });
};

export const uploadFields = [
    { name: 'photoUrl', maxCount: 1 },
    { name: 'hallTicketUrl', maxCount: 1 },
    { name: 'aadharCardUrl', maxCount: 1 },
    { name: 'casteCertificateUrl', maxCount: 1 }
];

// Middleware for validating required files
export const validateRequiredFiles = (req, res, next) => {
    const requiredFields = ['photoUrl', 'hallTicketUrl', 'aadharCardUrl', 'casteCertificateUrl'];
    for (const field of requiredFields) {
        if (!req.files[field] || req.files[field].length === 0) {
            return res.status(400).send({
                status: "failed",
                error: `The field ${field} is required and missing.`,
            });
        }
    }
    next();
};
