import express from "express"
import formidable from 'express-formidable';
import { addinWishList } from "../controllers/WishListController.js";


const wishListController = express.Router();

wishListController.post("/add-wishlist", addinWishList);

export default wishListController;