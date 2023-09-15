import mongoose,{Schema,Types, model} from "mongoose";
const courseSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
    },
    description:String,
    price:{
        type:Number,
        default:1
    },
    discount:{
        type:Number,
        default:0
    },
    finalPrice:{
        type:Number,
        default:1
    },
    mainImage:{
        type:Object,
    },
    Capacity:{
        type:Number,
        default:1

    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    categoryId:{type:Types.ObjectId,ref:'Category',required:true},
    createdBy:{type:Types.ObjectId,ref:'User',required:true},
    updatedBy:{type:Types.ObjectId,ref:'User',required:true},
},
{  
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
})


// courseSchema.virtual('reviews',{
// localField:'_id',
// foreignField:'courseId',
// ref:'Review',
// })
const courseModel = mongoose.models.course || model("course",courseSchema)
export default courseModel