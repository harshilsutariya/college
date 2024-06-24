import express from "express"
import studentApiRouter from "../api/student/studentApi.js"

const studentRouter = express.Router()

studentRouter.use("/student" , studentApiRouter)

export default studentRouter