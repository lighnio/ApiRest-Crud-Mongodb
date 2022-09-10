import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../../config.js';
import {getProperties} from '../utils/handlePropertiesEngine.js';


const propertiesKey = getProperties();


/**
 * You must pass the user object
 * @param {user} user 
 */
export const tokenSign = async (user) => {
    const internalSign = await jsonwebtoken.sign(
        {
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn:"2h",
        }
    );

    return internalSign;
}

export const verifyToken = async (tokenJwt) => {
    try {
        return jsonwebtoken.verify(tokenJwt, JWT_SECRET);
    } catch (e) {
        return null
    }
}