import express from 'express'
import cors from 'cors'
import { PORT } from './config.js';
import {dbConnect} from './src/config/mongo.js'
import router from './src/routes/tracks.js';


const app = express();

app.use(cors())
app.use('/api/', router)
app.listen(PORT)
console.log("SERVER ON PORT: ", PORT);