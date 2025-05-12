import jwt from "jsonwebtoken"
import "../config/dotenv.js"
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productScheme = new Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    productOldPrice: {
        type: String,
        required: true, 
    },
    productCurrentPrice: {
        type: String,
        required: true, 
    },
    productRating: {
        type: String,
        required: true, 
    },
    productInStock: {
        type: Boolean,
        required: true, 
    },
    productBrand: {
        type: String,
        required: true, 
    },
    productImages: {
        type: [String],
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    }
});


const productModel = mongoose.model('ecommerce', productScheme);

export default productModel;