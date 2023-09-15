import { roles } from "../../Middleware/auth.middleware.js";

export const endPoint = {
    update:[roles.superAdmin],
    delete:[roles.superAdmin],



}