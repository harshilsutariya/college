import express from "express"
import createOtpMethod from "../../../method/auth/otp/otp.js";
import { otpVerifyMethod } from "../../../method/auth/otp/otpverify.js";

const otpRouter = express.Router();

otpRouter.post('/send', createOtpMethod);

otpRouter.post('/verify', otpVerifyMethod);

export default otpRouter;