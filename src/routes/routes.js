import { Router } from "express";

// CONTROLLERS
import * as tracks from "../controllers/tracks.js";
import * as storage from '../controllers/storage.js'
import * as auth from '../controllers/auth.js';
// MIDDLEWARES
import { uploadMiddleware } from "../utils/handlerStorage.js";
import * as valTracks from '../validators/tracks.js'
import * as valStorage from '../validators/storage.js';
import * as valAuth  from '../validators/auth.js';
import { authMiddleware } from "../middlewares/session.js";


const router = Router();

// ###############
// AUTH
// ###############

router.post('/auth/register', valAuth.validatorRegister, auth.registerCtrl)


router.post('/auth/login', valAuth.validatorLogin, auth.loginCtrl); 

// ###############
// TRACKS
// ###############

/**
 * Get all tracks
 */
router.get('/tracks', authMiddleware, tracks.getItems)

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
router.put('/tracks/:id',valTracks.validatorGetItem, valTracks.validatorUpdateItem, tracks.updateItem);

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