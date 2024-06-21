import express from "express";
import multer from 'multer';
import { uploadMW } from "../../middleware/upload.js";
import {verifyToken} from '../../middleware/auth/verifyToken.js'

import collegeDetailCreateMethod from "../../method/collegeDetails/create/collegeDetail.js";
import infrastructureCreateMethod from "../../method/collegeDetails/create/infrastructure.js";
import highlightDetailCreateMethod from "../../method/collegeDetails/create/highlightsDetails.js";
import sportDetailCreateMethod from "../../method/collegeDetails/create/sportDetail.js";
import culturalDetailCreateMethod from "../../method/collegeDetails/create/culturalDetail.js";
import academicsDetailCreateMethod from "../../method/collegeDetails/create/academicsDetail.js";
import alumniAndToppersDetailCreateMethod from "../../method/collegeDetails/create/alumniAndToppersDetail.js";
import collegeImagesCreateMethod from "../../method/collegeDetails/create/collgeImagesDetail.js";
import eligibilityTermsCreateMethod from "../../method/collegeDetails/create/eligibilityAndTermsDetail.js";
import youTubeLinkCreateMethod from "../../method/collegeDetails/create/youTubeLinkDetail.js";
import collegePolicyAndSocialMediaCreateMethod from "../../method/collegeDetails/create/collegePolicyAndSocialMediaDetail.js";
import subjectsCreateMethod from "../../method/collegeDetails/create/subjectsDetail.js";
import managementAndStaffCreateMethod from "../../method/collegeDetails/create/managementAndStaffDetail.js"
import collegeDataWithId from "../../method/collegeDetails/find/collegeDetailWithId.js"
import collegeData from "../../method/collegeDetails/find/collegeDetail.js"
import collegeDetailUpdateMethod from "../../method/collegeDetails/update/collegeDetailUpdate.js"
import collegePolicyAndSocialMediaDetailUpdateMethod from "../../method/collegeDetails/update/collegePolicyAndSocialMediaDetailUpdate.js"
import youTubeLinkDetailUpdateMethod from "../../method/collegeDetails/update/youTubeLinkDetailUpdate.js"
import sportDetailUpdate from "../../method/collegeDetails/update/sportDetailUpdate.js"
import subjectDetailUpdateMethod from "../../method/collegeDetails/update/subjectDetailUpdate.js"
import infrastructureDetailUpdateMethod from "../../method/collegeDetails/update/infrastructureDetailUpdate.js"
import highlightDetailUpdateMethod from "../../method/collegeDetails/update/highlightsDetailsUpdate.js";
import academicsUpdateMultipleMethod from "../../method/collegeDetails/update/academicsDetailUpdate.js"
import collegeImagesUpdateMethod from "../../method/collegeDetails/update/collgeImagesDetailUpdate.js"
import culturalUpdateMethod from "../../method/collegeDetails/update/culturalDetailUpdate.js"
import managementAndStaffUpdateMethod from "../../method/collegeDetails/update/managementAndStaffDetailupdate.js"

import sportImageMethod from "../../method/collegeDetails/fetchImages/sportsImages.js";
import culturalImageMethod from "../../method/collegeDetails/fetchImages/culturalImage.js";
import academicsImageMethod from "../../method/collegeDetails/fetchImages/academicsImage.js";
import alumniAndToppersImageMethod from "../../method/collegeDetails/fetchImages/alumniAndtoppersImage.js";
import collegeImagesMethod from "../../method/collegeDetails/fetchImages/collegeimage.js";
import managementAndStaffImageMethod from "../../method/collegeDetails/fetchImages/managementAndStaffImage.js";
import eligibilityUpdateMethod from "../../method/collegeDetails/update/eligibilityAndTermsDetailUpdate.js";
import alumniAndToppersCreateMethod from "../../method/collegeDetails/update/alumniAndToppersDetailUpdate.js";

import { sportUploadDir } from "../../middleware/uploadDir.js";
import { culturalUploadDir} from "../../middleware/uploadDir.js";
import { academicsUploadDir } from "../../middleware/uploadDir.js";
import { alumniAndToppersUploadDir } from "../../middleware/uploadDir.js";
import { collegeImagesUploadDir } from "../../middleware/uploadDir.js";
import {managementAndStaffUploadDir} from "../../middleware/uploadDir.js"
import createCollegeTeamMethod from "../../method/collegeDetails/create/collegeTeam.js";

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const culturalupload = uploadMW(culturalUploadDir);
const sportupload = uploadMW(sportUploadDir);
const academicsupload = uploadMW(academicsUploadDir);
const alumniAndToppersupload = uploadMW(alumniAndToppersUploadDir);
const collegeImagesupload = uploadMW(collegeImagesUploadDir);
const managementAndStaffUpload = uploadMW(managementAndStaffUploadDir);

const collegeApisRouter = express.Router();

collegeApisRouter.post('/team/create', createCollegeTeamMethod);

// create data for college
collegeApisRouter.post('/detail/create', verifyToken, collegeDetailCreateMethod);

collegeApisRouter.post('/infrastructure/create', verifyToken, infrastructureCreateMethod);

collegeApisRouter.post('/highlights/create', verifyToken, highlightDetailCreateMethod);

collegeApisRouter.post('/sport/create', verifyToken, sportupload.array("image"), sportDetailCreateMethod);

collegeApisRouter.get('/sport/image/:imageName', verifyToken, sportImageMethod);

collegeApisRouter.post('/cultural/create', verifyToken, culturalupload.array("image"), culturalDetailCreateMethod);

collegeApisRouter.get('/cultural/image/:imageName', verifyToken, culturalImageMethod);

collegeApisRouter.post('/academics/create', verifyToken, academicsupload.array("image"), academicsDetailCreateMethod);

collegeApisRouter.get('/academic/image/:imageName', verifyToken, academicsImageMethod);

collegeApisRouter.post('/alumniAndToppers/create', verifyToken, alumniAndToppersupload.array("image"), alumniAndToppersDetailCreateMethod);

collegeApisRouter.get('/alumniAndToppers/image/:imageName', verifyToken, alumniAndToppersImageMethod);

collegeApisRouter.post('/collegeImages/create', verifyToken, collegeImagesupload.array("image"), collegeImagesCreateMethod);

collegeApisRouter.get('/collegeImages/image/:imageName', verifyToken, collegeImagesMethod);

collegeApisRouter.post('/managementAndStaff/create', verifyToken, managementAndStaffUpload.single("image"), managementAndStaffCreateMethod);

collegeApisRouter.get('/managementAndStaff/image/:imageName', verifyToken, managementAndStaffImageMethod);

collegeApisRouter.post('/eligibilityTerms/create', verifyToken, eligibilityTermsCreateMethod);

collegeApisRouter.post('/youTubeLink/create', verifyToken, youTubeLinkCreateMethod);

collegeApisRouter.post('/collegePolicyAndSocialMedia/create', verifyToken, collegePolicyAndSocialMediaCreateMethod);

collegeApisRouter.post('/subjects/create', verifyToken, subjectsCreateMethod);



//retrive data from the college
collegeApisRouter.get('/detail/get/specific/:collegeId', verifyToken, collegeDataWithId);

collegeApisRouter.get('/detail/get', verifyToken, collegeData);



//update data from the collge
collegeApisRouter.patch('/detail/update', verifyToken, collegeDetailUpdateMethod);

collegeApisRouter.patch('/collegePolicyAndSocialMediaDetail/update', verifyToken, collegePolicyAndSocialMediaDetailUpdateMethod);

collegeApisRouter.patch('/youTubeLink/update', verifyToken, youTubeLinkDetailUpdateMethod);

collegeApisRouter.patch('/sport/update', verifyToken, sportupload.array("image"), sportDetailUpdate);

collegeApisRouter.patch('/subject/update', verifyToken, subjectDetailUpdateMethod);

collegeApisRouter.patch('/managementAndStaff/update', verifyToken, managementAndStaffUpload.single("image"), managementAndStaffUpdateMethod);

collegeApisRouter.patch('/infrastructure/update', verifyToken, infrastructureDetailUpdateMethod);

collegeApisRouter.patch('/eligibilityAndTermsDetail/update', verifyToken, eligibilityUpdateMethod);

collegeApisRouter.patch('/highlights/update', verifyToken, highlightDetailUpdateMethod);

collegeApisRouter.patch('/academics/update', verifyToken, academicsupload.array("image"), academicsUpdateMultipleMethod);

collegeApisRouter.patch('/alumniAndToppers/update', verifyToken, alumniAndToppersupload.array("image"), alumniAndToppersCreateMethod);

collegeApisRouter.patch('/collegeImages/update', verifyToken, collegeImagesupload.array("image"), collegeImagesUpdateMethod);

collegeApisRouter.patch('/cultural/update', verifyToken, culturalupload.array("image"), culturalUpdateMethod);

export default collegeApisRouter;