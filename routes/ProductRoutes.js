import express from "express"
import { createNewProduct, getallProduts } from "../controllers/ProductController.js"

const productController = express.Router();

productController.post("/new-product", createNewProduct);
productController.get("/get-all-products", getallProduts);

export default productController;