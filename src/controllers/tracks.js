import {models} from '../models/index.js'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get all items
 */
export const getItems = async (req, res) => {
    const data = await models.tracksModel.find({})
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
    const {body} = req;
    const data = await models.tracksModel.create(body)
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