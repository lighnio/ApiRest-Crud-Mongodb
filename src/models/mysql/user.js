import { sequalize } from "../../config/mysql.js";
import { DataTypes } from 'sequelize';

export const User = sequalize.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.NUMBER,
        },
        email: {
            type: DataTypes.STRING,
        }, 
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM(["user", "admin"]),
        }
    },
    {
        timestamps: true,
    }
);