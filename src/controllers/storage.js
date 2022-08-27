import {models} from '../models/index.js'
import { PUBLIC_URL } from '../../config.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get all items
 */
export const getItems = async (req, res) => {
    const data = await models.storageModel.find({})
    res.send({data});
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
    const {body, file} = req;
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await models.storageModel.create(fileData)
    res.send({data})
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