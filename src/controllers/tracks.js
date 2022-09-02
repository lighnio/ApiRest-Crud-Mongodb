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
        const data = await models.tracksModel.find({})
        res.send({data});
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
export const getItem = (req, res) => {}


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
export const updateItem = (req, res) => {}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Delete item by id
 */
export const deleteItem = (req, res) => {}