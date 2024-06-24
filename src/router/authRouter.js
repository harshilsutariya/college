import express from "express"
import signInRouter from "../api/auth/signIn/signIn.js"

const authRouter = express.Router()

authRouter.use("/auth" , signInRouter)

export default authRouter