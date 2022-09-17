import express from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express';
import {openApiConf} from './docs/swagger.js'
import { dbConnect as dbConnectNoSql} from "./src/config/mongo.js";
import { dbConnectMySql } from './src/config/mysql.js';
import router from './src/routes/routes.js';
import {config} from 'dotenv';
config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./src/storage"));
app.use('/api/', router);
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(openApiConf))

process.env.NODE_ENV !== 'test'? app.listen(process.env.PORT || 3000) : '';

process.env.ENGINE_BD === 'nosql'? dbConnectNoSql() : dbConnectMySql();

console.log("SERVER ON PORT: ", process.env.PORT);

export default app;