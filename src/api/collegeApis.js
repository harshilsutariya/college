import express from "express";
import collegeDetailCreateMethod from "../method/collegeDetails/collegeDetail.js";
import infrastructureCreateMethod from "../method/collegeDetails/infrastructure.js";
import highlightDetailCreateMethod from "../method/collegeDetails/highlightsDetails.js";
import sportDetailCreateMethod from "../method/collegeDetails/sportDetail.js";
import culturalDetailCreateMethod from "../method/collegeDetails/culturalDetail.js";
import academicsDetailCreateMethod from "../method/collegeDetails/academicsDetail.js";
import { uploadMW } from "../middleware/upload.js";
import sportImageMethod from "../method/collegeDetails/fetchImages/sportsImages.js";
import culturalImageMethod from "../method/collegeDetails/fetchImages/culturalImage.js";
import academicsImageMethod from "../method/collegeDetails/fetchImages/academicsImage.js";
import { sportUploadDir } from "../middleware/uploadDir.js";
import { culturalUploadDir} from "../middleware/uploadDir.js";
import { academicsUploadDir } from "../middleware/uploadDir.js";

// Create multer upload middleware with dynamic storage
const culturalupload = uploadMW(culturalUploadDir);
const sportupload = uploadMW(sportUploadDir);
const academicsupload = uploadMW(academicsUploadDir);

const collegeApisRouter = express.Router();

collegeApisRouter.post('/detail', collegeDetailCreateMethod);

collegeApisRouter.post('/infrastructure', infrastructureCreateMethod);

collegeApisRouter.post('/highlights', highlightDetailCreateMethod);

collegeApisRouter.post('/sport', sportupload.array("image"), sportDetailCreateMethod);

collegeApisRouter.get('/image/:imageName', sportImageMethod);

collegeApisRouter.post('/cultural', culturalupload.array("image"), culturalDetailCreateMethod);

collegeApisRouter.get('/image/:imageName', culturalImageMethod);

collegeApisRouter.post('/academics', academicsupload.array("image"), academicsDetailCreateMethod);

collegeApisRouter.get('/image/:imageName', academicsImageMethod);

export default collegeApisRouter;