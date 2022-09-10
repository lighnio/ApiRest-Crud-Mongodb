import { sequalize } from "../../config/mysql.js";
import { DataTypes } from 'sequelize';

export const Storage = sequalize.define(
    "storages",
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true,
    }
);