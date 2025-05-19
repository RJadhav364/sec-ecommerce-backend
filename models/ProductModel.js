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
    productDiscount: {
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
    productImages: [{
        _id: false,
        data: Buffer,
        contentType:String,
    }],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory",
        required: true,
    },
    thirdLevelcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "thirdlevelcategory",
        required: true,
    },
    isFeatured: {
        type: Boolean,
        required: true, 
    },
    isPopular: {
        type: Boolean,
        required: true, 
    }
});


const productModel = mongoose.model('ecommerce', productScheme);

export default productModel;