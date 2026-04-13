import express from "express"
import formidable from 'express-formidable';
import { addProductInCart, getAllCartProducts, removeProductFromCart } from "../controllers/CartProductController.js";


const CartProductController = express.Router();

CartProductController.post("/add-product-cart", addProductInCart);
CartProductController.get("/get-cart-product/:id", getAllCartProducts);
CartProductController.delete("/wishlist-removed", removeProductFromCart);

export default CartProductController;