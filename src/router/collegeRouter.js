import express from 'express';
import collegeApisRouter from '../api/collegeApis.js';

const collegeDetailRoutes = express.Router();

collegeDetailRoutes.use("/college", collegeApisRouter);

export default collegeDetailRoutes;