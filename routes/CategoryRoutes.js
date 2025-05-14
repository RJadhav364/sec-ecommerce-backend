import express from "express"
import formidable from 'express-formidable';
import { createNewCategory, getallCategories, getCategoryImage } from "../controllers/CategoryController.js"

const categoryController = express.Router();

categoryController.post("/new-category",formidable(), createNewCategory);
categoryController.get("/get-all-categories", getallCategories);
categoryController.get("/get-category-image/:id", getCategoryImage);

export default categoryController;