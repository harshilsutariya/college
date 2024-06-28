import express from 'express';
import otpRouter from '../api/auth/foregetPassword/otp.js';

const forgetRoutes = express.Router();

forgetRoutes.use(otpRouter);

export default forgetRoutes;