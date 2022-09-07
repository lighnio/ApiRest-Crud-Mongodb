import {models} from '../models/index.js'
import { PUBLIC_URL } from '../../config.js';
import {handleHttpError} from '../utils/handleErrors.js'
import { matchedData } from 'express-validator';
import {unlinkSync} from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get all items
 */
export const getItems = async (req, res) => {
    try {
        const data = await models.storageModel.find({})
        res.send({data});
    } catch (e) {
        handleHttpError(res, "Error getting storage items")
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get one track by id
 */
export const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await models.storageModel.findById(id)
        res.send({data});
    } catch (e) {
        handleHttpError(res, "Error getting storage")
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
        const {file} = req;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await models.storageModel.create(fileData)
        res.send({data})
    } catch (e) {
        console.log(e);
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Update item by id
 */
export const updateItem = async (req, res) => {}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Delete item by id
 */
export const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await models.storageModel.findById(id);
        storageModel.delete({_id: id});
        console.log("Data:");
        console.log(data);
        const {filename} = data;
        const filepath = `${__dirname}/../${filename}`;
        unlinkSync(filepath);

        const resData = {
            filepath,
            deleted: 1
        }
        res.send({resData});
    } catch (e) {
        handleHttpError(res, "Error deleting storage")
    }
}