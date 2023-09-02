import cloudinary from "../../../Services/cloudinary.js"
import slugify from "slugify"
import { asyncHandler } from "../../../Services/errorHandling.js"
import CourseModel from "../../../../DB/model/Course.model.js"
import categoryModel from "../../../../DB/model/Category.model.js"

export const createCourse =asyncHandler( async (req,res,next)=>{
const {name,price,discount,categoryId,} = req.body

const checkCategory = await categoryModel.findOne({_id:categoryId})

if(!checkCategory){
    return next(new Error('invalid category',{cause:400}))
}


req.body.slug = slugify(name)
req.body.finalPrice = price - (price*((discount||0)/100))
const {public_id,secure_url} = await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.APP_NAME}/Course`})
req.body.mainImage={public_id,secure_url}

req.body.createdBy=req.user._id
req.body.updatedBy=req.user._id

const Course = await CourseModel.create(req.body)
if(!Course){
    return next(new Error('faild to create Course',{cause:400}))
}
return res.json({message:'sucess',Course})
})

// export const updateCourse = asyncHandler(async (req,res,next)=>{
//     const{CourseId}=req.params

//     const newCourse = await CourseModel.findById(CourseId)
//     if(!newCourse){
//         return next(new Error('Course not found',{cause:400}))
//     }
//     const {name,price,discount,categoryId,} = req.body
//     if(categoryId){
//         const checkCategory = await categoryModel.findOne({_id:categoryId})
//         if(checkCategory){
//             newCourse.categoryId=categoryId

//         }else{
//             return next(new Error('category id or sub category id not found',{cause:400}))
//         }
//     }else if(subCategoryId){
//         const checkSubCategory = await subcategoryModel.findOne({_id:subCategoryId})
//         if(checkSubCategory){
//             newCourse.subCategoryId=subCategoryId
//         }else{
//             return next(new Error('sub category id not found',{cause:400}))
//         }
//     }
//     // if(brandId){
//     //     const checkBrand = await globalErrorHandlerModel.findOne({_id:brandId})
//     //     if(!checkBrand){
//     //         return next(new Error('invalid brand',{cause:400}))
//     //     }else{
//     //         newCourse.brandId=brandId
//     //     }
//     // }
//     if(name){
//         newCourse.name=name
//         newCourse.slug=slugify(name)
//     }
//     if(req.body.description){
//         newCourse.description=req.body.description
//     }
//     if(req.body.stock){
//         newCourse.stock=req.body.stock
//     }
//     if(req.body.colors){
//         newCourse.colors=req.body.colors
//     }
//     if(req.body.sizes){
//         newCourse.sizes=req.body.sizes
//     }
//     if(req.body.sizes){
//         newCourse.sizes=req.body.sizes
//     }
//     if(price && discount){
//         newCourse.finalPrice = price - (price*((discount||0)/100))
//         newCourse.price = price
//         newCourse.discount = discount
//     }else if(price){
//         newCourse.price = price
//         newCourse.finalPrice = price - (price*((newCourse.discount)/100))
//     }else if(discount){
//         newCourse.discount = discount
//         newCourse.finalPrice = newCourse.price - (newCourse.price*((discount)/100))
//     }
//     if(req.files.mainImage.length){
//         const {public_id,secure_url} = await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.APP_NAME}/Course`})
//         await cloudinary.uploader.destroy(newCourse.mainImage.public_id)
//         newCourse.mainImage.secure_url=secure_url
//         newCourse.mainImage.public_id=public_id
//     }
//     if(req.files.subImages.length){
//         const subImages=[]
    
//         for(const file of req.files.subImages){
    
//             const {public_id,secure_url} = await cloudinary.uploader.upload(file.path,{folder:`${process.env.APP_NAME}/Course/subImages`})
//             subImages.push({public_id,secure_url})
//             newCourse.subImages=subImages
            
//         }
//     }
//     newCourse.updatedBy=req.user._id
//     const Course = await newCourse.save()
//     if(!Course){
//         return next(new Error('fail to update Course',{cause:400}))
//     }
//     return res.json({message:'success',Course})
// })

// export const getCourse = asyncHandler(async(req,res,next)=>{
//     let{CourseId} = req.params
//     const Course = await CourseModel.findById(CourseId)
//     if(!Course){
//         return next(new Error('Course is not found',{cause:400}))
//     }
//     return res.json({message:'success',Course})
// })
// export const getCourses = asyncHandler(async(req,res,next)=>{
//     let {page,size} = req.query

//     if(!page || page<=0){
//         page= 1
//     }
//     if(!size || size<=0){
//         size= 3 
//     }
//     const skip = (page-1)*size

//     const excQuryParams = ['page','size','sort','search']

//     const filterQuery = {...req.query}
//     excQuryParams.map(params =>{
//         delete filterQuery[params]
//     })

//     const query = JSON.parse(JSON.stringify(filterQuery).replace(/(gt|gte|lt|lte|in|nin|eq|nqe)/g,match=>`$${match}`))
//     const mongoQuary=CourseModel.find(query).limit(size).skip(skip).sort(req.query.sort?.replaceAll(',',''))

//     if(req.query.find){

//         const Courses = await mongoQuary.find({
//             $or:[
    
//                 {name:{$regex:req.query.search,$options:'i'}},
//                 {description:{$regex:req.query.search,$options:'i'}},
    
//             ]
    
//         })
//         req.body.Courses = Courses

//     }else{
//         const Courses = await mongoQuary
//         req.body.Courses = Courses


//     }
//     const Courses = req.body.Courses
//     if(!Courses){
//         return next(new Error('Courses is not found',{cause:400}))
//     }
//     return res.json({message:'success',Courses})
// })
// export const softDelete = asyncHandler(async(req,res,next)=>{
//     let {CourseId}=req.params
//     const Course = await CourseModel.findOneAndUpdate({_id:CourseId,isDeleted:false},{isDeleted:true},{new:true})
//     if(!Course){
//         return next(new Error('Course not found',{cause:400}))
//     }
//     return res.json({message:'success',Course})
// })
// export const restore = asyncHandler(async(req,res,next)=>{
//     let {CourseId}=req.params
//     const Course = await CourseModel.findOneAndUpdate({_id:CourseId,isDeleted:true},{isDeleted:false},{new:true})
//     if(!Course){
//         return next(new Error('Course not found',{cause:400}))
//     }
//     return res.json({message:'success',Course})
// })
// export const getSoftDeleteCourses = asyncHandler(async(req,res,next)=>{
//     const Course = await CourseModel.find({isDeleted:true})
//     if(!Course){
//         return next(new Error('Course not found',{cause:400}))
//     }
//     return res.json({message:'success',Course})
// })
// export const forceDelete = asyncHandler(async(req,res,next)=>{
//     let {CourseId}=req.params
//     const Course = await CourseModel.findOneAndDelete({_id:CourseId,isDeleted:true})
//     if(!Course){
//         return next(new Error('Course not found',{cause:400}))
//     }
//     return res.json({message:'success',Course})
// })







