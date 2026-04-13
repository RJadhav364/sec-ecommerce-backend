import "../config/dotenv.js"
import mongoose from "mongoose";

const Schema =  mongoose.Schema;

const productCartSchema = new Schema({
    cartProducts: {
        type: Object,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ecommerce",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
    },
    productQuantity: {
        type: Number,
        required: true,
        default: 1 
    }
},
{ timestamps: true }
);

const cartProductModel = mongoose.model('cartProduct', productCartSchema);

export default cartProductModel;