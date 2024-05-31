import express from "express";
import collegeDetailCreateMethod from "../method/collegeDetails/collegeDetail.js";
import infrastructureCreateMethod from "../method/collegeDetails/infrastructure.js";
import highlightDetailCreateMethod from "../method/collegeDetails/highlightsDetails.js";

const collegeApisRouter = express.Router();

collegeApisRouter.post('/detail', collegeDetailCreateMethod);

collegeApisRouter.post('/infrastructure', infrastructureCreateMethod);

collegeApisRouter.post('/highlights', highlightDetailCreateMethod);

export default collegeApisRouter;