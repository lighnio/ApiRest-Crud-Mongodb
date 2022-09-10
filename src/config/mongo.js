import mongoose from 'mongoose';
import { DB_URI } from '../../config.js';



export const dbConnect = () => {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        err ? console.log(`Mongo Connection Error: \n${err}`) : console.log('Sucessfull Connection with Mongo');
    })
}