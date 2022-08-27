import {schema as usersSchema} from './nosql/users.js';
import {schema as tracksSchema} from './nosql/tracks.js';
import {schema as storageSchema} from './nosql/storage.js';

export const models = {
    usersModel: usersSchema,
    tracksModel: tracksSchema,
    storageModel: storageSchema
    
}