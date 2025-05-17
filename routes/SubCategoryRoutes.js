import express from "express"
import { createNewSubCategory, getallSubCategories } from "../controllers/SubCategoryController.js"
import formidable from "express-formidable"
const subCategoryController = express.Router();

subCategoryController.post("/new-sub-category", formidable(), createNewSubCategory);
subCategoryController.get("/get-all-sub-categories", getallSubCategories);

export default subCategoryController;