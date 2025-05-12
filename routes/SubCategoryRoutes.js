import express from "express"
import { createNewSubCategory, getallSubCategories } from "../controllers/SubCategoryController.js"

const subCategoryController = express.Router();

subCategoryController.post("/new-sub-category", createNewSubCategory);
subCategoryController.get("/get-all-sub-categories", getallSubCategories);

export default subCategoryController;