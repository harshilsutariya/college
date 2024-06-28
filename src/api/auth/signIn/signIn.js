import express from "express"
import collegeSignInMethod from "../../../method/auth/signIn/collegeSignIn.js";
import studentSignInMethod from "../../../method/auth/signIn/studentSignIn.js";

const signInRouter = express.Router();

signInRouter.post('/college', collegeSignInMethod);

signInRouter.post('/student' , studentSignInMethod)

export default signInRouter;