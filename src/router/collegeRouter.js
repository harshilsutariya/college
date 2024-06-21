import express from 'express';
import collegeApisRouter from '../api/college/collegeApis.js';

const collegeDetailRoutes = express.Router();

collegeDetailRoutes.use("/college", collegeApisRouter);

export default collegeDetailRoutes;