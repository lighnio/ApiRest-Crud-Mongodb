import { handleHttpError } from "../utils/handleErrors.js";

/**
 * Array with allowed roles
 * @param {rol} rol 
 * @returns 
 */
export const checkRol = (roles) => (req, res, next) => {
    try {
        const {user} = req;
        const rolesByUser = user.role;
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))

        if (!checkValueRol){
            handleHttpError(res, "User not permissions.", 403);
            return
        }
        next();

    } catch (e) {
        handleHttpError(res, "Permissions Error", 403);
    }
}