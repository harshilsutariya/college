import express from 'express';
import otpRouter from '../api/auth/forgotPassword/otp.js';

const forgetRoutes = express.Router();

forgetRoutes.use("/otp", otpRouter);

export default forgetRoutes;