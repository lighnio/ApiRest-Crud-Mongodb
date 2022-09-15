import express from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express';
import {openApiConf} from './docs/swagger.js'
import { dbConnect as dbConnectNoSql} from "./src/config/mongo.js";
import { dbConnectMySql } from './src/config/mysql.js';
import { ENGINE_BD, PORT, NODE_ENV } from './config.js';
import router from './src/routes/routes.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static("./src/storage"));
app.use('/api/', router);
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(openApiConf))

NODE_ENV !== 'test'? app.listen(PORT) : '';

ENGINE_BD === 'nosql'? dbConnectNoSql() : dbConnectMySql();

console.log("SERVER ON PORT: ", PORT);

export default app;