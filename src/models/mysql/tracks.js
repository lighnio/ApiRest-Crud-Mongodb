import { sequalize } from "../../config/mysql.js";
import { DataTypes } from 'sequelize';
import {Storage} from './storage.js';

export const Tracks = sequalize.define(
    "tracks",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        album: {
            type: DataTypes.STRING
        },
        cover: {
            type: DataTypes.STRING
        },
        artist_name: {
            type: DataTypes.STRING
        },
        artist_nickname: {
            type: DataTypes.STRING
        },
        artist_nationality: {
            type: DataTypes.STRING
        },
        duration_start: {
            type: DataTypes.INTEGER
        },
        duration_end: {
            type: DataTypes.INTEGER
        },
        mediaId: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true,
    }
);

/**
 * Implements personalized model
 */

Tracks.findAllData = function () {
    Tracks.belongsTo(Storage, {
        foreignKey: 'mediaId',
        as: 'audio'
    })

    return Tracks.findAll({include: 'audio'})
};

Tracks.findOneData = function (id) {
    Tracks.belongsTo(Storage, {
        foreignKey: 'mediaId',
        as: 'audio'
    })

    return Tracks.findOne({where: { id }, include: 'audio'})
};