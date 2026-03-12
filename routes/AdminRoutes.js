import express from "express"
import { adminLogin, createNewSubAdmin, getAllProducts } from "../controllers/AdminController.js";
const adminController = express.Router();

adminController.post("/admin-register", createNewSubAdmin);
adminController.post("/admin-login", adminLogin);
adminController.post("/admin-products", getAllProducts);

export default adminController;