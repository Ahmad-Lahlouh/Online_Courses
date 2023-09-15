import userModel from "../../../../DB/model/User.model.js";
import cloudinary from "../../../Services/cloudinary.js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import { compare, hash } from "../../../Services/hashAndCompare.js";


// export const updatePassword=async  (req,res,next)=>{
//     const {oldPassword,newPassword} = req.body;
//     const user = await userModel.findById(req.user._id);
//     const match = compare(oldPassword,user.password)
//     if(!match){
//         return next(new Error("invalid password "));
//     }
//     const hashPassword = hash(newPassword);
//     await userModel.findByIdAndUpdate(req.user._id,{password:hashPassword});
//     return res.json({message:"success"})

// }

export  const changeStatus = asyncHandler(async(req,res,next)=>{
    
    const user = await userModel.findById(req.params.id).select('userName email role status')
    if(!user){
        return next(new Error(`invalid user id `,{cause:400}))
    }
    if(req.body.status || req.body.role    ){
    user.status = req.body.status
    user.role = req.body.role
}
await user.save()
return res.json({message:'success',user})

})

export const deleted = asyncHandler(async(req,res,next)=>{
    const user = await userModel.findById(req.params.id).select('userName email role status')
    if(!user){
        return next(new Error(`invalid user id `,{cause:400}))
    }
    if(user.role=="User"){
        return next(new Error(`user is not an admin `,{cause:400}))
    }
    const deletedUser = await userModel.deleteOne({_id:req.params.id})
    return res.json({message:"success"})
})

export const getAdmin = asyncHandler(async(req,res,next)=>{
    let{adminid} = req.params
    const admin = await userModel.findById(adminid)
    if(!admin||admin.role=="User"){
        return next(new Error('Admin is not found',{cause:400}))
    }
    return res.json({message:'success',admin})
})

export const getAllAdmins = asyncHandler(async(req,res,next)=>{
    const admins = await userModel.find({role:"Admin"})
    if(!admins||admins.length==0){
        return next(new Error('Admins are not found',{cause:400}))
    }
    return res.json({message:'success',admins})
})








