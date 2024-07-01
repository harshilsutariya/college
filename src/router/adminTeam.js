import express from "express"
import adminTeamApisRouter from "../api/admin/adminTeam.js"

const adminTeamRouter = express.Router()

adminTeamRouter.use("/team" , adminTeamApisRouter)

export default adminTeamRouter