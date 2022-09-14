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
import { checkRol } from "../middlewares/rol.js";

const router = Router();

// ###############
// AUTH
// ###############
/**
 * Register New User
 *  @openapi
 *  /auth/register:
 *      post:
 *          tags: 
 *              - Auth
 *          summary: "Register New User"
 *          description: "This route is for registry a new user."
 *          requestBody: 
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 * 
 *          responses: 
 *              '201':
 *                  description: "User Added Successfully"
 *              '403':
 *                  description: "Error validating user"
 */
router.post('/auth/register', valAuth.validatorRegister, auth.registerCtrl)

/** 
 * Login User
 * @openapi
 * /auth/login:
 *      post:
 *          tags:
 *              - Auth
 *          summary: "Log User"
 *          description: "This route is for log an user"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authLogin"
 *          responses:
 *                  '200':
 *                      description: "User Log Success"
 *                  '403':
 *                      description: "Error Validating"
 */
router.post('/auth/login', valAuth.validatorLogin, auth.loginCtrl); 



// ###############
// TRACKS
// ###############
/**
 * Get all tracks
 * @openapi
 * /tracks:
 *      get:
 *          tags:
 *              - Tracks
 *          summary: "List All tracks"
 *          description: "Show all tracks"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: Return files list
 *              '402':
 *                  description: Error, you must have permission
 *      responses:
 *          '201':
 *              description: Return desired object with code 201
 */
router.get('/tracks', authMiddleware, tracks.getItems)

/**
 * Get tracks by id
 * @openapi
 * /tracks/{id}:
 *      get:
 *          tags:
 *              - Tracks
 *          summary: "Get Track Detail"
 *          description: "Show all tracks"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - name: id
 *                in: path
 *                description: "Track Id"
 *                required: true
 *                schema:
 *                    type: string
 *          responses:
 *              '200':
 *                  description: "Return track detail"
 *              '422':
 *                  description: "Error Validating"
 */
router.get('/tracks/:id', authMiddleware, valTracks.validatorGetItem, tracks.getItem);

/**
* Create New Track
 * @openapi
 * /tracks:
 *      post:
 *          tags:
 *              - Tracks
 *          summary: "Add Track"
 *          description: "Insert new track"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *             - name: body
 *               in: body
 *               description: "Required parameters for insert"
 *               required: true
 *               schema: 
 *                  $ref: "#/components/schemas/track"
 *          responses:
 *              '200':
 *                  description: "Track added successfully"
 *              '422':
 *                  description: "Error Validating"
 */
router.post('/tracks', authMiddleware, checkRol(['user', 'admin']), valTracks.validatorCreateItem, tracks.createItem);

/**
* Update Track
 * @openapi
 * /tracks/{id}:
 *      put:
 *          tags:
 *              - Tracks
 *          summary: "Update Track"
 *          description: "Update a track"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: "body"
 *                name: "body"
 *                description: "Required parameters for update"
 *                required: true
 *                schema:
 *                  $ref: "#/components/schemas/track"
 *              - in: "path"
 *                name: "id"
 *                description: "Track id"
 *                required: true
 *                schema:
 *                    type: string
 *          responses:
 *              '200': 
 *                  description: "Track Updated"
 *              '422': 
 *                  description: "Error Validating"
 */
router.put('/tracks/:id', authMiddleware, valTracks.validatorGetItem, valTracks.validatorUpdateItem, tracks.updateItem);

/**
 * Delete Track
* @openapi
* /tracks/{id}:
*      delete:
*          tags:
*              - Tracks
*          summary: "Delete Track"
*          description: "Delete Track"
*          security:
*              - bearerAuth: []
*          parameters:
*              -  in: "path"
*                 name: "id"
*                 description: "Track Id"
*                 required: true
*                 schema:
*                    type: string
*          responses:
*              '200':
*                  description: "Track Deleted"
*              '422':
*                  description: "Error Validating"
*/
router.delete('/tracks/:id', authMiddleware, valTracks.validatorGetItem, tracks.deleteItem);



// ###############
// STORAGE
// ###############
/** 
 * Get Tracks
 * @openapi
 * /storage:
 *      get:
 *          tags:
 *              - Storage
 *          summary: "List Files"
 *          description: "Get all files lists"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: "Return the files list"
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              type: array
 *                          items:
 *                              $ref: "#/components/schemas/storage"
 *              '422':
 *                  description: "Validating Error"
 */
router.get('/storage', storage.getItems)

/** 
 * Get Track
 * @openapi
 * /storage/{id}:
 *      get:
 *          tags:
 *              - Storage
 *          summary: "Storage Detail"
 *          description: "Get Detail from Storage"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - name: id
 *              in: path
 *              description: "Storage Id to return"
 *              required: true
 *              schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: "Returns storage object"
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              $ref: "#/components/schemas/storage"
 *              '422':
 *                  description: "Error Validating"
 */
router.get('/storage/:id', valStorage.validatorGetItem,storage.getItem)

/** 
 * Create New Storage
 * @openapi
 * /storage:
 *      post:
 *          tags:
 *              - Storage
 *          summary: "Upload File"
 *          description: "Upload File"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: "Returns the new object inserted in the collection"
 *              '422':
 *                  description: "Error Validating"
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              myfile:
 *                                  type: string
 *                                  format: binary
 */
router.post('/storage/',uploadMiddleware.single("myfile"), storage.createItem);

/** 
 * Delete Storage
 * @openapi
 * /storage/{id}:
 *      delete:
 *          tags:
 *              - Storage
 *          summary: "Delete Storage Object"
 *          description: "Delete the detail about one storage"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - name: id
 *                in: path
 *                description: "Id of storage to remove"
 *                required: true
 *                schema:
 *                    type: string
 *          responses:
 *              '200':
 *                  description: "Storage Deleted"
 *              '422':
 *                  description: "Error Validating"
 */
router.delete('/storage/:id', valStorage.validatorGetItem, storage.deleteItem)


export default router;