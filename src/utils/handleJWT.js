import jsonwebtoken from 'jsonwebtoken';
import {getProperties} from '../utils/handlePropertiesEngine.js';
import {config} from 'dotenv';
config();


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
        process.env.JWT_SECRET,
        {
            expiresIn:"2h",
        }
    );

    return internalSign;
}

export const verifyToken = async (tokenJwt) => {
    try {
        return jsonwebtoken.verify(tokenJwt, process.env.JWT_SECRET);
    } catch (e) {
        return null
    }
}