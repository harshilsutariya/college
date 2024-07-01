import express from "express";
import createCollegeTeamMethod from "../../method/admin/create/collegeTeam.js";
import createSuperTeamMethod from "../../method/admin/create/superTeam.js";
import { verifyToken } from "../../middleware/auth/verifyToken.js";
import getAllCollegeTeam from "../../method/admin/find/collegeTeam.js";
import getAllSuperTeam from "../../method/admin/find/superTeam.js";

const adminTeamApisRouter = express.Router();

adminTeamApisRouter.post('/college', verifyToken, createCollegeTeamMethod);

adminTeamApisRouter.post('/super', createSuperTeamMethod);

adminTeamApisRouter.get('/college/get/:collegeId', getAllCollegeTeam);

adminTeamApisRouter.get('/super/get', getAllSuperTeam);

export default adminTeamApisRouter