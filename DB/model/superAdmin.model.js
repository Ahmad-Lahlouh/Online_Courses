
import mongoose, {Schema,model} from 'mongoose';
const superAdminSchema = new Schema ({
    userName:{
        type:String,
        required:[true,'username is required'],
        min:[2],
        max:[20]
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    image:{
        type:Object,
    },
    phone:{
        type:String,
    },
    role:{
        type:String,
        default:'superAdmin',
    },
    profilePic:{
        type:String,
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','Not_Active']
    },
    adress:{
        type:String,
    },
    gender:{
        type:String,
        enum:['Male','Female']
    },
    forgetCode:{
        type:String,
        default:null
    } ,
    changePasswordTime:{
        type:Date
    },
    profilePublicUrl:String,
    coverPic:[String],
},
{
    timestamps:true
})
const superAdminModel = mongoose.models.superAdmin ||  model('superAdmin', superAdminSchema);
export default superAdminModel;