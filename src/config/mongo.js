import mongoose from 'mongoose';
import { DB_URI } from '../../config.js';



export const dbConnect = () => {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        err ? console.log(`Error de conexion: \n${err}`) : console.log('Conexion realizada correctamente');
    })
}

dbConnect();