import express from "express"
import formidable from 'express-formidable';
import { createNewCustomer , customerLogin } from "../controllers/CustomerController.js";
const customerController = express.Router();

customerController.post("/new-customer", createNewCustomer);
customerController.post("/customer-login", customerLogin);

export default customerController;