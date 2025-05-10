import express from "express"
import { createNewSubCategory } from "../controllers/SubCategoryController.js"

const subCategoryController = express.Router();

subCategoryController.post("/new-sub-category", createNewSubCategory);
// categoryController.get("/get-all-products", getallProduts);

export default subCategoryController;