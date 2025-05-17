import express from "express"
import { createNewThirdLevelCategory } from "../controllers/thirdLevelCategoryController.js";
import formidable from "express-formidable"


const thirdLevelCategoryController = express.Router();

thirdLevelCategoryController.post("/create-thirdlevel-category",formidable(), createNewThirdLevelCategory);
// thirdLevelCategoryController.get("/get-all-thirdlevel-categories", getallSubCategories);

export default thirdLevelCategoryController;