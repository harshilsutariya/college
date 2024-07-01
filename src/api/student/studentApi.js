import express from "express"
import { verifyToken } from "../../middleware/auth/verifyToken.js";
import studentDetailCreateMethod from "../../method/students/create/studentRegistration.js";
import studentDetailUpdateMethod from "../../method/students/update/studentUpdate.js";
import { uploadFields, uploadMW, validateRequiredFiles } from "../../middleware/upload.js";
import { studentApplicationUploadDir } from "../../middleware/uploadDir.js";
import studentApplicationCreateMethod from "../../method/collegeAppilcation/create/studentCollegeApplication.js";
import photoUrlmageMethod from "../../method/students/fetchImages/studentphotoUrlImages.js";
import hallTicketUrlmageMethod from "../../method/students/fetchImages/studentHallTicketUrlImages.js";
import aadharCardUrlmageMethod from "../../method/students/fetchImages/studentaadharCardUrlImages.js";
import casteCertificateUrlmageMethod from "../../method/students/fetchImages/studentcasteCertificateUrlImages.js";
import studentReviewDetailCreateMethod from "../../method/students/create/studentReview.js";
import studentReviewDetailUpdateMethod from "../../method/students/update/studentReviewUpdate.js";
import studentFavouriteCollegeCreateMethod from "../../method/students/create/studentFavouriteCollege.js";
import deletestudentFavouriteCollegeMethod from "../../method/students/delete/stduentFavouriteCollege.js";
import getAllstudentsMethod from "../../method/students/find/student.js";

const studentApplicationUpload = uploadMW(studentApplicationUploadDir);

const studentApiRouter = express.Router();

studentApiRouter.post('/detail/create', studentDetailCreateMethod);

studentApiRouter.post('/apply', studentApplicationUpload.fields(uploadFields), validateRequiredFiles, studentApplicationCreateMethod);

studentApiRouter.post('/review/create', studentReviewDetailCreateMethod);

studentApiRouter.post('/favouriteCollege/create', studentFavouriteCollegeCreateMethod);



studentApiRouter.patch('/detail/update', verifyToken, studentDetailUpdateMethod);

studentApiRouter.patch('/review/update', studentReviewDetailUpdateMethod);



studentApiRouter.patch('/favouriteCollege/delete/:studentFavouriteCollegeId', deletestudentFavouriteCollegeMethod);

studentApiRouter.get('/apply/image/:imageName', photoUrlmageMethod);

studentApiRouter.get('/apply/image/:imageName', hallTicketUrlmageMethod);

studentApiRouter.get('/apply/image/:imageName', aadharCardUrlmageMethod);

studentApiRouter.get('/apply/image/:imageName', casteCertificateUrlmageMethod);


studentApiRouter.get('/get', getAllstudentsMethod);


export default studentApiRouter;