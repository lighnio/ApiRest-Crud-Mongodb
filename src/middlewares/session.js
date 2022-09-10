import {handleHttpError} from '../utils/handleErrors.js';
import { verifyToken } from '../utils/handleJWT.js';
import { models } from '../models/index.js';
import { getProperties } from '../utils/handlePropertiesEngine.js';

const propertiesKey = getProperties();

export const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            handleHttpError(res, "Need Session", 401);
            return
        }

        const token = req.headers.authorization.split(' ').pop();

        const dataToken = await verifyToken(token);

        if (!dataToken){
            handleHttpError(res, "NOT PAYLOAD DATA", 401);
            return
        }

        const user = await models.usersModel.findOne({[propertiesKey.id]: dataToken[propertiesKey.id]})
        req.user = user;

        next()


    } catch (e) {
        handleError(res, "No session", 401);
    }
}