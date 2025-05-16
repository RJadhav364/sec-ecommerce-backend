import express from "express"
import { createNewProduct, getallProduts, getProductImage } from "../controllers/ProductController.js"
import formidable from 'express-formidable';
const productController = express.Router();

productController.post("/new-product",formidable({ multiples: true, keepExtensions: true }), createNewProduct);
productController.get("/get-all-products/:id", getallProduts);
productController.get("/get-product-image/:id/:index", getProductImage);

export default productController;