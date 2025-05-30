import "../config/dotenv.js"
import mongoose from "mongoose";

const Schema =  mongoose.Schema;

const wishListSchema = new Schema({
    wishList: {
        type: String,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ecommerce",
    },
},
{ timestamps: true }
);

const wishListModel = mongoose.model('wishlist', wishListSchema);

export default wishListModel;