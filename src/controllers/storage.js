import {models} from '../models/index.js'
import {handleHttpError} from '../utils/handleErrors.js'
import { matchedData } from 'express-validator';
import {unlinkSync} from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from "path";

import {config} from 'dotenv';
config();

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
            url: `${process.env.PUBLIC_URL}/${file.filename}`
        }
        const data = await models.storageModel.create(fileData)
        res.status(201);
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
        models.storageModel.delete({_id: id});
        const {filename} = data;
        const filepath = `${__dirname}/../storage/${filename}`;
        unlinkSync(filepath);

        const resData = {
            filepath,
            deleted: 1
        }
        res.status(200);
        res.send({data: resData});
    } catch (e) {
        console.log(e);
        handleHttpError(res, "Error deleting storage")
    }
}