import express from "express"
import otpMethod from "../../../method/auth/otp/otp.js";
import { otpverifyMethod } from "../../../method/auth/otp/otpverify.js";

const otpRouter = express.Router();

otpRouter.post('/otp', otpMethod);
otpRouter.post('/verifyOtp', otpverifyMethod);

export default otpRouter;