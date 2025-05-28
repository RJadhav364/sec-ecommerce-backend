import express from "express"
import formidable from 'express-formidable';
import { createNewCustomer } from "../controllers/CustomerController.js";
const customerController = express.Router();

customerController.post("/new-customer", createNewCustomer);

export default customerController;