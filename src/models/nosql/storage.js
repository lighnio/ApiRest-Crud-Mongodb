import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

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

StoreSchema.plugin(mongooseDelete, {overrideMethods: "all"});
export const schema = mongoose.model("storage", StoreSchema)