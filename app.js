import express from 'express'
import cors from 'cors'
import { PORT } from './config.js';
import {dbConnect} from './src/config/mongo.js'


const app = express();

app.use(cors())

app.listen(PORT)
console.log("SERVER ON PORT: ", PORT);