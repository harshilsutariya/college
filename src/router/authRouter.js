import express from "express"
import signInRouter from "../api/auth/signIn/signIn.js"
import signOutRouter from "../api/auth/signOut/signout.js"

const authRouter = express.Router()

authRouter.use("/signIn" , signInRouter)
authRouter.use("/signOut" , signOutRouter)

export default authRouter