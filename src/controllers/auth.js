import {matchedData} from 'express-validator';
import { encrypt, internalCompare } from '../utils/handlePassword.js';
import { tokenSign } from '../utils/handleJWT.js';
import {models} from '../models/index.js'
import { handleHttpError } from '../utils/handleErrors.js';
// import { compare } from 'bcryptjs';


/**
 * This controller is responsible for registering users
 * @param {*} req 
 * @param {*} res 
 */
export const registerCtrl = async (req, res) => {

    try {
        req = matchedData(req);
        const password = await encrypt(req.password)
        const body = {...req, password};
        const dataUser = await models.usersModel.create(body);
        dataUser.set('password', undefined, {strict: false});

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.status(201);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "Error registering user");
    }
}


/**
 * This controller login a person
 * @param {*} req 
 * @param {*} res 
 */
export const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await models.usersModel.findOne({email: req.email})
        // .select('password email role name');
        if (!user){
            handleHttpError(res, "User not exist!", 404);
            return 
        }

        const hashPassword = user.password; 
        const check = await internalCompare(req.password, hashPassword);

        if (!check){
            handleHttpError(res, "Invalid Password", 401);
            return 
        }

        user.set('password', undefined, {strict: false});
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({ data })

    } catch (e) {
        handleHttpError(res, "Error login user")
    }
}