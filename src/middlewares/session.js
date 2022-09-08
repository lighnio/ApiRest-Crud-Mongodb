import {handleHttpError} from '../utils/handleErrors.js';
import { verifyToken } from '../utils/handleJWT.js';
import { models } from '../models/index.js';

export const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            handleHttpError(res, "Need Session", 401);
            return
        }

        const token = req.headers.authorization.split(' ').pop();

        const dataToken = await verifyToken(token);

        if (!dataToken._id){
            handleHttpError(res, "Error id token", 401);
            return
        }

        const user = await models.usersModel.findById(dataToken._id)
        req.user = user;

        next()


    } catch (e) {
        handleError(res, "No session", 401);
    }
}