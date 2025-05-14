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
        data: Buffer,
        contentType:String,
    },
},
{ timestamps: true }
);

const categoryModel = mongoose.model('category', categorySchema);

export default categoryModel;