import express from "express"
import collegeSignInRouter from "../api/auth/signIn/collegeSignIn.js"


const authRouter = express.Router()

authRouter.use("/auth" , collegeSignInRouter)

export default authRouter