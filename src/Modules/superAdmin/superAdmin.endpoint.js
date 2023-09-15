import { roles } from "../../Middleware/auth.middleware.js";

export const endPoint = {
    userUpdate:[roles.User],
    update:[roles.superAdmin],
    delete:[roles.superAdmin],



}