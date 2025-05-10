import "../config/dotenv.js"
import mongoose from "mongoose";

const Schema =  mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    categoryImage: {
        type: String,
        required: true,
    },
},
{ timestamps: true }
);

const categoryModel = mongoose.model('category', categorySchema);

export default categoryModel;