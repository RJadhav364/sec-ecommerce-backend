import "../config/dotenv.js"
import mongoose from "mongoose";

const Schema =  mongoose.Schema;

const thirdLevelCategorySchema = new Schema({
    thirdLevelCatName: {
        type: String,
        required: true,
        unique: true
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategories",
    },
},
{ timestamps: true }
);

const thirdLevelCategoryModel = mongoose.model('thirdlevelcategory', thirdLevelCategorySchema);

export default thirdLevelCategoryModel;