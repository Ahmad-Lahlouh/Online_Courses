import superAdminModel from "../../../../DB/model/superAdmin.model.js";
import cloudinary from "../../../Services/cloudinary.js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import { compare, hash } from "../../../Services/hashAndCompare.js";

export const profilePic =asyncHandler(async (req,res,next)=>{

    if(!req.file){
        return next(new Error("please provide a file"));
    }
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`superAdmin/${req.id}/profile`});
    const superAdmin = await superAdminModel.findByIdAndUpdate(req.id,{profilePic:secure_url,profolePublicUrl:public_id}
    ,{new:false})
    if(user.profolePublicUrl){

        await cloudinary.uploader.destroy(superAdmin.profolePublicUrl);
    }
    return res.json({message:"success",superAdmin});

}) 

export const coverPic =async (req,res,next)=>{

    if(!req.files){
        return next(new Error("please provide a file"));
    }
    const coverPic=[];
    for(const file of req.files){
        coverPic.push(`${file.dest}`)
    }
    const superAdmin = await superAdminModel.findByIdAndUpdate(req.id,{coverPic:coverPic}
    ,{new:true})
    return res.json({message:"success",superAdmin});
}

export const updatePassword=async  (req,res,next)=>{
    const {oldPassword,newPassword} = req.body;
    const superAdmin = await superAdminModel.findById(req.user._id);
    const match = compare(oldPassword,superAdmin.password)
    if(!match){
        return next(new Error("invalid password "));
    }
    const hashPassword = hash(newPassword);
    await superAdminModel.findByIdAndUpdate(req.user._id,{password:hashPassword});
    return res.json({message:"success"})

}

export const shareProfile = async(req,res,next)=>{

    const superAdmin = await superAdminModel.findById(req.params.id).select('userName email ');

    if(!superAdmin){
        return next(new Error("invalid profile id"));
    }else{

        return res.json({message:'success',superAdmin});
    }
    
}

export  const changeStatus = asyncHandler(async(req,res,next)=>{
    
    const superAdmin = await superAdminModel.findById(req.params.id).select('userName email role status')
    if(!superAdmin){
        return next(new Error(`invalid user id `,{cause:400}))
    }
    if(req.body.status || req.body.role    ){
    user.status = req.body.status
    user.role = req.body.role
}
await user.save()
return res.json({message:'success',superAdmin})

})

export const deleted = asyncHandler(async(req,res,next)=>{
    const superAdmin = await superAdminModel.findById(req.params.id).select('userName email role status')
    if(!superAdmin){
        return next(new Error(`invalid user id `,{cause:400}))
    }
    const deletedAdmin = await superAdminModel.deleteOne({_id:req.params.id})
    return res.json({message:"success"})
})






