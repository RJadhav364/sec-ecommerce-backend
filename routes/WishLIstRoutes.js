import express from "express"
import formidable from 'express-formidable';
import { addinWishList, getAllFavouriteProducts, removeProductFromWishList } from "../controllers/WishListController.js";


const wishListController = express.Router();

wishListController.post("/add-wishlist", addinWishList);
wishListController.get("/get-wishlist/:id", getAllFavouriteProducts);
wishListController.delete("/wishlist-removed", removeProductFromWishList);

export default wishListController;