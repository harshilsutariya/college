import { fileURLToPath } from 'url';
import path from 'path';
import { log } from 'console';

// Determine the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the directory for file uploads
export const academicsUploadDir = path.join(__dirname, '../assets/academics');
export const sportUploadDir = path.join(__dirname, '../assets/sports');
export const culturalUploadDir = path.join(__dirname, '../assets/cultural');
export const alumniAndToppersUploadDir = path.join(__dirname, '../assets/alumniAndToppers');
export const collegeImagesUploadDir = path.join(__dirname, '../assets/collgeImages');
export const managementAndStaffUploadDir = path.join(__dirname, '../assets/managementAndStaff');