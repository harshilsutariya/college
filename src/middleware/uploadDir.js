import { fileURLToPath } from 'url';
import path from 'path';

// Determine the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the directory for file uploads
export const culturalUploadDir = path.join(__dirname, '../assets/cultural');
export const sportUploadDir = path.join(__dirname, '../assets/sports');
export const academicsUploadDir = path.join(__dirname, '../assets/academics');