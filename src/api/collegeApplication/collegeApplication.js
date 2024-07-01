import express from "express"
import { getAllStudentCollegeApplicationMethod, getSpecificCollegeStudentApplicationMethod, getspecificStudentCollegeApplicationMethod } from "../../method/collegeAppilcation/find/getCollegeApplication.js";
import getStudentAppliedCollegeCreateMethod from "../../method/collegeAppilcation/find/getStudentAppliedColleges.js";

const collegeApplicationApiRouter = express.Router();

collegeApplicationApiRouter.get('/get', getAllStudentCollegeApplicationMethod);

collegeApplicationApiRouter.get('/get/specific/:collegeId', getSpecificCollegeStudentApplicationMethod);

collegeApplicationApiRouter.get('/get/specific/student/:studentApplyId', getspecificStudentCollegeApplicationMethod);

collegeApplicationApiRouter.get('/get/specific/appliedCollege/:studentId', getStudentAppliedCollegeCreateMethod);

export default collegeApplicationApiRouter;