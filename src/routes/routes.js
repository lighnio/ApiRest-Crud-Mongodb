import { Router } from "express";
import * as tracks from "../controllers/tracks.js";
import * as storage from '../controllers/storage.js'
import { uploadMiddleware } from "../utils/handlerStorage.js";


const router = Router();

// ###############
// TRACKS
// ###############
// GET
router.get('/tracks', tracks.getItems)

// GET by ID
router.get('/:id', tracks.getItem)

// CREATE
router.post('/tracks', tracks.createItem);


// ###############
// STORAGE
// ###############
router.post('/storage', uploadMiddleware.single("myfile"), storage.createItem)


export default router;