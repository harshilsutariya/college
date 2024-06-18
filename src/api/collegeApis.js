import express from "express";
import multer from 'multer';
import { uploadMW } from "../middleware/upload.js";

import collegeDetailCreateMethod from "../method/collegeDetails/create/collegeDetail.js";
import infrastructureCreateMethod from "../method/collegeDetails/create/infrastructure.js";
import highlightDetailCreateMethod from "../method/collegeDetails/create/highlightsDetails.js";
import sportDetailCreateMethod from "../method/collegeDetails/create/sportDetail.js";
import culturalDetailCreateMethod from "../method/collegeDetails/create/culturalDetail.js";
import academicsDetailCreateMethod from "../method/collegeDetails/create/academicsDetail.js";
import alumniAndToppersDetailCreateMethod from "../method/collegeDetails/create/alumniAndToppersDetail.js";
import collegeImagesCreateMethod from "../method/collegeDetails/create/collgeImagesDetail.js";
import eligibilityTermsCreateMethod from "../method/collegeDetails/create/eligibilityAndTermsDetail.js";
import youTubeLinkCreateMethod from "../method/collegeDetails/create/youTubeLinkDetail.js";
import collegePolicyAndSocialMediaCreateMethod from "../method/collegeDetails/create/collegePolicyAndSocialMediaDetail.js";
import subjectsCreateMethod from "../method/collegeDetails/create/subjectsDetail.js";
import managementAndStaffCreateMethod from "../method/collegeDetails/create/managementAndStaffDetail.js"
import collegeDataWithId from "../method/collegeDetails/find/collegeDetailWithId.js"
import collegeData from "../method/collegeDetails/find/collegeDetail.js"

import sportImageMethod from "../method/collegeDetails/fetchImages/sportsImages.js";
import culturalImageMethod from "../method/collegeDetails/fetchImages/culturalImage.js";
import academicsImageMethod from "../method/collegeDetails/fetchImages/academicsImage.js";
import alumniAndToppersImageMethod from "../method/collegeDetails/fetchImages/alumniAndtoppersImage.js";
import collegeImagesMethod from "../method/collegeDetails/fetchImages/collegeimage.js";
import managementAndStaffImageMethod from "../method/collegeDetails/fetchImages/managementAndStaffImage.js";


import { sportUploadDir } from "../middleware/uploadDir.js";
import { culturalUploadDir} from "../middleware/uploadDir.js";
import { academicsUploadDir } from "../middleware/uploadDir.js";
import { alumniAndToppersUploadDir } from "../middleware/uploadDir.js";
import { collegeImagesUploadDir } from "../middleware/uploadDir.js";
import {managementAndStaffUploadDir} from "../middleware/uploadDir.js"

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const culturalupload = uploadMW(culturalUploadDir);
const sportupload = uploadMW(sportUploadDir);
const academicsupload = uploadMW(academicsUploadDir);
const alumniAndToppersupload = uploadMW(alumniAndToppersUploadDir);
const collegeImagesupload = uploadMW(collegeImagesUploadDir);
const managementAndStaffUpload = uploadMW(managementAndStaffUploadDir);

const collegeApisRouter = express.Router();

collegeApisRouter.post('/detail', collegeDetailCreateMethod);

collegeApisRouter.post('/infrastructure', infrastructureCreateMethod);

collegeApisRouter.post('/highlights', highlightDetailCreateMethod);

collegeApisRouter.post('/sport', sportupload.array("image"), sportDetailCreateMethod);

collegeApisRouter.get('/sport/image/:imageName', sportImageMethod);

collegeApisRouter.post('/cultural', culturalupload.array("image"), culturalDetailCreateMethod);

collegeApisRouter.get('/cultural/image/:imageName', culturalImageMethod);

collegeApisRouter.post('/academics', academicsupload.array("image"), academicsDetailCreateMethod);

collegeApisRouter.get('/academic/image/:imageName', academicsImageMethod);

collegeApisRouter.post('/alumniAndToppers', alumniAndToppersupload.array("image"), alumniAndToppersDetailCreateMethod);

collegeApisRouter.get('/alumniAndToppers/image/:imageName', alumniAndToppersImageMethod);

collegeApisRouter.post('/collegeImages', collegeImagesupload.array("image"), collegeImagesCreateMethod);

collegeApisRouter.get('/collegeImages/image/:imageName', collegeImagesMethod);

collegeApisRouter.post('/managementAndStaff', managementAndStaffUpload.single("image"), managementAndStaffCreateMethod);

collegeApisRouter.get('/managementAndStaff/image/:imageName', managementAndStaffImageMethod);

collegeApisRouter.post('/eligibilityTerms', eligibilityTermsCreateMethod);

collegeApisRouter.post('/youTubeLink', youTubeLinkCreateMethod);

collegeApisRouter.post('/collegePolicyAndSocialMedia', collegePolicyAndSocialMediaCreateMethod);

collegeApisRouter.post('/subjects', subjectsCreateMethod);

collegeApisRouter.get('/readwithId/:collegeId', collegeDataWithId);

collegeApisRouter.get('/read/', collegeData);

export default collegeApisRouter;