import {Router} from "express"; 
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import * as courseController from './controller/Course.controller.js'
import { auth, roles } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./Course.endpoint.js";
const router = Router({mergeParams:true});


// router.use('/:courseId/review',reviewRouter)

router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).fields([
    {name:'mainImage',maxCount:1},
]),courseController.createCourse)

// router.put('/update/:courseId',auth(endPoint.update),fileUpload(fileValidation.image).fields([
//     {name:'mainImage',maxCount:1},
//     {name:'subImages',maxCount:5}
// ]),courseController.updateCourse)

// router.patch('/softDelete/:courseId',auth(endPoint.softDelete),courseController.softDelete)
// router.delete('/forceDelete/:courseId',auth(endPoint.forceDelete),courseController.forceDelete)
// router.patch('/restore/:courseId',auth(endPoint.restore),courseController.restore)
// router.get('/softDelete',auth(endPoint.get),courseController.getSoftDeleteCourses)
// router.get('/:courseId',courseController.getCourse)
// router.get('/',courseController.getCourses)

export default router