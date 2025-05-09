import express from "express"
import { createNewProduct } from "../controllers/ProductController.js"

const productController = express.Router();

productController.post("/new-product", createNewProduct);

export default productController;