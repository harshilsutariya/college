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
