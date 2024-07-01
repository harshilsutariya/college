import express from "express"
import collegeApplicationApiRouter from "../api/collegeApplication/collegeApplication.js"

const collegeApplicationaRouter = express.Router()

collegeApplicationaRouter.use("/collegeApplication" , collegeApplicationApiRouter)

export default collegeApplicationaRouter