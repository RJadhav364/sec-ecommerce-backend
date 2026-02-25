import express from "express"
import { createNewSubAdmin } from "../controllers/AdminController.js";
const adminController = express.Router();

adminController.post("/admin-register", createNewSubAdmin);

export default adminController;