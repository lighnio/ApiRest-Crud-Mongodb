import { Router } from "express";
import * as tracks from "../controllers/tracks.js";
import * as storage from '../controllers/storage.js'
// MIDDLEWARES
import { uploadMiddleware } from "../utils/handlerStorage.js";
import * as valTracks from '../validators/tracks.js'
import * as valStorage from '../validators/storage.js';


const router = Router();

// ###############
// TRACKS
// ###############

/**
 * Get all tracks
 */
router.get('/tracks', tracks.getItems)

/**
 * Get track by id
 */
router.get('/tracks/:id', valTracks.validatorGetItem, tracks.getItem);

/**
 * Create a new track
 */
router.post('/tracks', valTracks.validatorCreateItem, tracks.createItem);

/**
 * Update a track
 */
router.put('/tracks/:id',valTracks.validatorGetItem, valTracks.validatorCreateItem, tracks.updateItem);

/**
 * Delete track by id
 */
router.delete('/tracks/:id',valTracks.validatorGetItem, tracks.deleteItem);

// ###############
// STORAGE
// ###############

/**
 * Get storage items
 */
router.get('/storage', storage.getItems)

/**
 * Get storage by id
 */
router.get('/storage/:id', valStorage.validatorGetItem,storage.getItem)

/**
 * Create a new item storage
 */
router.post('/storage/',uploadMiddleware.single("myfile"), storage.createItem);

/**
 * Delete item by id
 */
router.delete('/storage/:id', valStorage.validatorGetItem, storage.deleteItem)


export default router;