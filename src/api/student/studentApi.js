import express from "express"
import { verifyToken } from "../../middleware/auth/verifyToken.js";
import studentDetailCreateMethod from "../../method/students/create/studentRegistration.js";
import studentDetailUpdateMethod from "../../method/students/update/studentUpdate.js";
import { uploadFields, uploadMW, validateRequiredFiles } from "../../middleware/upload.js";
import { studentApplicationUploadDir } from "../../middleware/uploadDir.js";
import studentApplicationCreateMethod from "../../method/students/create/studentCollegeApplication.js";
import photoUrlmageMethod from "../../method/students/fetchImages/studentphotoUrlImages.js";

const studentApplicationUpload = uploadMW(studentApplicationUploadDir);

const studentApiRouter = express.Router();

studentApiRouter.post('/create', studentDetailCreateMethod);

studentApiRouter.patch('/update', verifyToken, studentDetailUpdateMethod);

studentApiRouter.post('/apply', studentApplicationUpload.fields(uploadFields), validateRequiredFiles, studentApplicationCreateMethod);

studentApiRouter.get('/apply/image/:imageName', verifyToken, photoUrlmageMethod);

export default studentApiRouter;