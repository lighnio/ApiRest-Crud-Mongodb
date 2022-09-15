import mongoose from 'mongoose';
import { DB_URI, DB_URI_TEST, NODE_ENV } from '../../config.js';

let db_uri;

NODE_ENV === 'test' ? db_uri = DB_URI_TEST : DB_URI;

export const dbConnect = () => {
    mongoose.connect(db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        err ? console.log(`Mongo Connection Error: \n${err}`) : console.log('Sucessfull Connection with Mongo');
    })
}