import joi from 'joi'
import { generalFeilds } from '../../Middleware/validation.js'

// export const createCourse = joi.object({
//     name:joi.string().min(2).max(20).required(),
//     categoryId:generalFeilds.id.required()
// }).required()

// export const updateCourse = joi.object({
//     categoryId:generalFeilds.id,
//     name:joi.string().min(2).max(20),
//     file:generalFeilds.file,
// }).required()  

// export const getAllCourses = joi.object({
//     categoryId:generalFeilds.id.required(),

// }).required()  