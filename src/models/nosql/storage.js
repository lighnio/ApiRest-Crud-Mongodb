import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const schema = mongoose.model("storage", StoreSchema)