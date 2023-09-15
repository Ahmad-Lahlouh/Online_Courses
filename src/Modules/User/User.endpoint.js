import { roles } from "../../Middleware/auth.middleware.js";

export const endPoint = {
    userUpdate:[roles.User],
    profilepic:[roles.User]




}