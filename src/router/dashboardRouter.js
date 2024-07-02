import express from 'express';
import dashboardApiRouter from '../api/dashboard/AdminDashbord.js';

const dashboardRoutes = express.Router();

dashboardRoutes.use("/dashboard", dashboardApiRouter);

export default dashboardRoutes;