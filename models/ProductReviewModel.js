import jwt from "jsonwebtoken";
import "../config/dotenv.js";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productReviewScheme = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ecommerce",
    unique: true,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    unique: true,
    required: true,
  },
  reviewerName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productRating: {
      type: String,
      required: true,
  },
},{
    timestamps: true,
  });


const productReviewModel = mongoose.model("productReview", productReviewScheme);

export default productReviewModel;
