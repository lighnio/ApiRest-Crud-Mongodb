import mongoose from 'mongoose';
import {config} from 'dotenv';
config();

let db_uri;

process.env.NODE_ENV === 'test' ? db_uri = process.env.DB_URI_TEST : db_uri = process.env.DB_URI;

export const dbConnect = () => {
    mongoose.connect(db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        err ? console.log(`Mongo Connection Error: \n${err}`) : console.log('Sucessfull Connection with Mongo');
    })
}