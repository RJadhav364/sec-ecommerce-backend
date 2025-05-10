import express from "express"
import { createNewCategory, getallCategories } from "../controllers/CategoryController.js"

const categoryController = express.Router();

categoryController.post("/new-category", createNewCategory);
categoryController.get("/get-all-categories", getallCategories);
// categoryController.get("/get-all-products", getallProduts);

export default categoryController;