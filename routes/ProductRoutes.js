import express from "express"
import { createNewProduct, getallProduts, getProductImage } from "../controllers/ProductController.js"
import formidable from 'express-formidable';
const productController = express.Router();

productController.post("/new-product",formidable(), createNewProduct);
productController.get("/get-all-products", getallProduts);
productController.get("/get-product-image/:id", getProductImage);

export default productController;