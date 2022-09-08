import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../../config.js';


/**
 * You must pass the user object
 * @param {user} user 
 */
export const tokenSign = async (user) => {
    const internalSign = await jsonwebtoken.sign(
        {
            _id: user._id,
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