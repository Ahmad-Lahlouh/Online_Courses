import { roles } from "../../Middleware/auth.middleware.js";

export const endPoint = {
    create:[roles.Admin,roles.superAdmin],
    update:[roles.Admin,roles.superAdmin],
    get:[roles.User,roles.Admin,roles.superAdmin],
    delete:[roles.Admin]

}