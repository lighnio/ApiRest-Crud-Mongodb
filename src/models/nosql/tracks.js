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

TrackScheme.statics.findAllData = (name) => {

}

TrackScheme.plugin(mongooseDelete, {overrideMethods: "all"});
export const schema = mongoose.model("tracks", TrackScheme)