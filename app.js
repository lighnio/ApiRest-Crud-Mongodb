import express from 'express'
import cors from 'cors'
import { dbConnect as dbConnectNoSql} from "./src/config/mongo.js";
import { dbConnectMySql } from './src/config/mysql.js';
import { ENGINE_BD, PORT } from './config.js';
import router from './src/routes/routes.js';


const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static("./src/storage"))
app.use('/api/', router)
app.listen(PORT)

ENGINE_BD === 'nosql'? dbConnectNoSql() : dbConnectMySql();

console.log("SERVER ON PORT: ", PORT);