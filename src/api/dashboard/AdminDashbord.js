import express from "express"
import superAdminDashboardmethod from "../../method/dashboard/superAdminDashboard.js";

const dashboardApiRouter = express.Router();

dashboardApiRouter.get('/superAdmin', superAdminDashboardmethod);

export default dashboardApiRouter;