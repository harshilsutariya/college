import express from "express"
import signOutMethod from "../../../method/auth/signOut/SignOutMethod.js";


const signOutRouter = express.Router();

signOutRouter.post('/user',signOutMethod);

export default signOutRouter;