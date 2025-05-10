import "../config/dotenv.js"
import mongoose from "mongoose";

const Schema =  mongoose.Schema;

const subCategorySchema = new Schema({
    subCategoryName: {
        type: String,
        required: true,
        unique: true
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
},
{ timestamps: true }
);

const subCategoryModel = mongoose.model('subcategory', subCategorySchema);

export default subCategoryModel;