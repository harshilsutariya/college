import express from "express"
import { collegeSignInMethod } from "../../../method/collegeAuth/signIn/collegeSignIn.js";


const collegeSignInRouter = express.Router();

// Unprotected Routes
collegeSignInRouter.post('/signin/college', collegeSignInMethod);

export default collegeSignInRouter