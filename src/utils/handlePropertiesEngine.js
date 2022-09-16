import {config} from 'dotenv';
config();

export const getProperties = () => {
    const data = {
        nosql: {
            id: '_id'
        },
        mysql: {
            id: 'id'
        }
    }
    return data[process.env.ENGINE_BD];
}