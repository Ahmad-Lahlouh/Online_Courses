import {Router} from 'express';
import * as superAdminController from './Controller/superAdmin.controller.js';
import { auth } from '../../Middleware/auth.middleware.js';
import { asyncHandler } from '../../Services/errorHandling.js';
import fileUpload, { fileValidation } from '../../Services/multerCloudinary.js';
import validation from '../../Middleware/validation.js'
import * as validators from './superAdmin.validation.js';
import { endPoint } from './superAdmin.endpoint.js';
;
const router =Router();

// router.patch('/profilePic',auth,fileUpload(fileValidation.image).single('image'),
// validation(validators.profilePic),
// userController.profilePic);
// router.patch('/coverPic',auth,fileUpload(fileValidation.image).
// array('image',4),userController.coverPic);
// router.get('/:id/profile',validation(validators.shareProfile),userController.shareProfile);

// router.put('/updatePassword',auth(endPoint.passUpdate),validation(validators.updatePassword),superAdminController.updatePassword);
router.put('/:id',auth(endPoint.update),superAdminController.changeStatus)
router.delete('/delete/:id',auth(endPoint.delete),superAdminController.deleted)


export default router;