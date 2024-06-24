import express from "express"
import collegeSignInMethod from "../../../method/auth/signIn/collegeSignIn.js";
import studentSignInMethod from "../../../method/auth/signIn/studentSignIn.js";

const signInRouter = express.Router();

signInRouter.post('/signin/college', collegeSignInMethod);

signInRouter.post('/signin/student' , studentSignInMethod)

export default signInRouter