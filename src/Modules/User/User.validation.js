import { generalFeilds } from "../../Middleware/validation.js";
import joi from 'joi';

export const profilePic = joi.object({
    file:generalFeilds.file
})

export const updatePassword = joi.object({
        oldPassword:generalFeilds.password,
        newPassword:generalFeilds.password.invalid(joi.ref('oldPassword')),
        cPassword:joi.string().valid(joi.ref('newPassword')).required(),

}).required()


export const shareProfile = {
    params:joi.object({
        id:generalFeilds.id
    }).required()

}