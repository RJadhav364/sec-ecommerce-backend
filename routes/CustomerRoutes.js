import express from "express"
import formidable from 'express-formidable';
import { createNewCustomer , customerLogin, updateCustomerDetails } from "../controllers/CustomerController.js";
const customerController = express.Router();

customerController.post("/new-customer", createNewCustomer);
customerController.post("/customer-login", customerLogin);
customerController.put("/customer-edit/:id",formidable(), updateCustomerDetails);

export default customerController;