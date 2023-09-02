
import mongoose, {Schema,model} from 'mongoose';
const userSchema = new Schema ({
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
        default:'User',
        enum:['User','Admin','superAdmin']
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
const userModel = mongoose.models.User ||  model('User', userSchema);
export default userModel;


