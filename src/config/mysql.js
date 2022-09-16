import Sequalize from 'sequelize';
import {config} from 'dotenv';
config();

let db;
process.env.NODE_ENV === 'test' ? db = process.env.MYSQL_DB_TEST : db = process.env.MYSQL_DB;

const user = process.env.MYSQL_USER;
const pass = process.env.MYSQL_PASS;
const host = process.env.MYSQL_HOST;

export const sequalize = new Sequalize(
    db, user, pass,
    {
        host,
        dialect: 'mysql'
    }
)

export const dbConnectMySql = async () => {
    try {
        await sequalize.authenticate();
        console.log("MySql Success Connection");
    } catch (e) {
        console.log('MySql Connection Error: ', e);
    }
}