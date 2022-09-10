import {ENGINE_BD} from '../../config.js';

// NOSQL
import {schema as usersSchema} from './nosql/users.js';
import {schema as tracksSchema} from './nosql/tracks.js';
import {schema as storageSchema} from './nosql/storage.js';

// MYSQL
import {User as usersSchemaMSQL} from './mysql/user.js';
import {Tracks as tracksSchemaMSQL} from './mysql/tracks.js';
import {Storage as storageSchemaMSQL} from './mysql/storage.js';

let mdels;

(ENGINE_BD === 'nosql') ? (
    mdels = {
        usersModel: usersSchema,
        tracksModel: tracksSchema,
        storageModel: storageSchema
    }) : 
    (mdels = {
        usersModel: usersSchemaMSQL,
        tracksModel: tracksSchemaMSQL,
        storageModel: storageSchemaMSQL
    })


export const models = mdels;