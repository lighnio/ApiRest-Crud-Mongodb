import express from 'express'
import cors from 'cors'
import { dbConnect } from "./src/config/mongo.js";
import { PORT } from './config.js';
import router from './src/routes/routes.js';


const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static("./src/storage"))
app.use('/api/', router)
app.listen(PORT)
console.log("SERVER ON PORT: ", PORT);