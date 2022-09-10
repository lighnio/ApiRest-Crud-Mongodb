import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const TrackScheme = new mongoose.Schema({
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: "ERROR_URL",
            },
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: mongoose.Types.ObjectId   
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

/**
 * Implements own method related to Storage
 */

TrackScheme.statics.findAllData = function() {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: 'storages',
                localField: "mediaId",
                foreignField: "_id",
                as: "audio",
            },
        },
        {
            $unwind: "$audio"
        }
    ])

    return joinData;
}

TrackScheme.statics.findOneData = function(id) {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: 'storages',
                localField: "mediaId",
                foreignField: "_id",
                as: "audio",
            },
        },
        {
            $unwind: "$audio"
        },
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        }
    ])

    return joinData;
}

TrackScheme.plugin(mongooseDelete, {overrideMethods: "all"});
export const schema = mongoose.model("tracks", TrackScheme)