import express from "express"
import { verifyToken } from "../../middleware/auth/verifyToken.js";
import studentDetailCreateMethod from "../../method/students/create/studentRegistration.js";
import studentDetailUpdateMethod from "../../method/students/update/studentUpdate.js";

const studentApiRouter = express.Router();

studentApiRouter.post('/create', studentDetailCreateMethod);

studentApiRouter.patch('/update', verifyToken, studentDetailUpdateMethod);

export default studentApiRouter