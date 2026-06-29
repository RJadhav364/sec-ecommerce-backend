import express from "express"
import { createNewProductReview, getProductReview } from "../controllers/ProductReviewController.js";
import formidable from 'express-formidable';
const productReviewController = express.Router();

productReviewController.post("/new-product-review", createNewProductReview);
productReviewController.get("/get-product-reviews/:id/", getProductReview);

export default productReviewController;