import express from "express"
import { adminLogin, createNewSubAdmin } from "../controllers/AdminController.js";
const adminController = express.Router();

adminController.post("/admin-register", createNewSubAdmin);
adminController.post("/admin-login", adminLogin);

export default adminController;