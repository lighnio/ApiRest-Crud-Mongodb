import { matchedData } from 'express-validator';
import {models} from '../models/index.js'
import {handleHttpError} from '../utils/handleErrors.js'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get all items
 */
export const getItems = async (req, res) => {
    try {
        const user = req.user;
        const data = await models.tracksModel.find({});
        res.send({data, user})
    } catch (e) {
        handleHttpError(res, "Error getting tracks")
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get one item by id
 */
export const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await models.tracksModel.findOneData(id);
        res.send({data});
    } catch (e) {
        handleHttpError(res, "Error getting track")
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Create item
 */
export const createItem = async (req, res) => { 

    try {
        const body = matchedData(req);
        const data = await models.tracksModel.create(body);
        res.send({data});
    } catch (e) {
        handleHttpError(res, "Error creating tracks")
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Update item by id
 */
export const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req);
        const data = await models.tracksModel.findOneAndUpdate(id, body);
        res.send({data});
    } catch (e) {
        handleHttpError(res, "Error updating track")
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Delete item by id
 */
export const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await models.tracksModel.delete({_id:id});
        const delData = {
            data,
            deleted:1
        }
        res.send({data: delData});
    } catch (e) {
        handleHttpError(res, "Error deleting track")
    }
}