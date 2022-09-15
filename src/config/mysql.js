import Sequalize from 'sequelize';
import { MYSQL_DB, MYSQL_DB_TEST, MYSQL_USER, MYSQL_PASS, MYSQL_HOST , NODE_ENV} from '../../config.js';

let db;
NODE_ENV === 'test' ? db = MYSQL_DB_TEST : db = MYSQL_DB;

const user = MYSQL_USER;
const pass = MYSQL_PASS;
const host = MYSQL_HOST;

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