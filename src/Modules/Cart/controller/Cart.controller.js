import cloudinary from "../../../Services/cloudinary.js"
import slugify from "slugify"
import { asyncHandler } from "../../../Services/errorHandling.js"
import courseModel from "../../../../DB/model/Course.model.js"
import cartModel from "../../../../DB/model/Cart.model.js"

export const addCourseToCart =asyncHandler( async (req,res,next)=>{
    const {courseId}=req.body
    const course = await courseModel.findById(courseId)
    if(!course){
        return next(new Error('course is not found',{cause:400}))
    }
    // if(course.stock<qty){
        //     return next(new Error('quantity is not found',{cause:400}))
        // }
        const cart = await cartModel.findOne({userId:req.user._id})
        if(!cart){
            const newCart = await cartModel.create({
                userId:req.user._id,
                courses:[{
                    courseId
                    
                }]
    })
    return res.status(201).json({message:'success'},newCart)
}
let matchcourses = false
for(let i=0;i<cart.courses.length;i++){
    
    if(cart.courses[i].courseId.toString() === courseId){
        matchcourses=true
        break
    }
}
if(matchcourses==false){
    cart.courses.push({courseId})
}
await cart.save()
    return res.status(200).json({message:'success',cart})
})

export const deleteItem = asyncHandler(async(req,res,next)=>{

    const{courseIds}=req.body

    const deleteItem = await cartModel.updateOne({userId:req.user._id},{

        $pull:{
            courses:{
                courseId:{$in:courseIds}
    
            }
        }
    })

    return res.json({message:'success',deleteItem})
})

export const clearCart = asyncHandler(async(req,res,next)=>{
    const clearCart = await cartModel.updateOne({userId:req.user._id},{
        courses:[]
    })
        return res.status(200).json({message:'success'})

})

// export const getCart = asyncHandler(async(req,res,next)=>{
//     const cart= await cartModel.findOne({userId:req.user._id})
//     return res.status(200).json({message:'success',cart})

// })





